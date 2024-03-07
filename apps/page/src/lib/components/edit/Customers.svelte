<script>
	import moment from 'moment';
	import { get, post, put, del } from 'lib/api';
	import { fade } from 'svelte/transition';
	import { countryCodeEmoji } from 'country-code-emoji';
	import Button from 'lib/components/Button.svelte';
	import FeatherIcon from 'lib/components/FeatherIcon.svelte';
	import ToggleGroup from '$lib/components/ToggleGroup.svelte';
	import Loader from 'lib/components/Loader.svelte';
	import EditCustomer from '$lib/components/edit/Customer.svelte';
	import EditChatRoom from '$lib/components/edit/ChatRoom.svelte';
	import csv from 'csvtojson';
	import { showSuccessMessage } from 'lib/services/toast';
	import BackTo from '$lib/components/BackTo.svelte';

	export let page;
	let parentPage = page.parentPage || page;

	export let selectedCustomer;
	export let selectedChatRoom;

	let selectedCustomerTab = 'all';

	let isCustomersLoading = false;

	let chatRooms = [];

	let pageNum = 1;

	let customersPaged = {};

	let loadCustomers = async () => {
		isCustomersLoading = true;

		if (selectedCustomerTab === 'customers') {
			customersPaged = await get(`customers`, {
				pageId: parentPage._id,
				isWithEmail: true,
				page: pageNum++,
				perPage: 20
			});
		} else if (selectedCustomerTab === 'visitors') {
			customersPaged = await get(`customers`, {
				pageId: parentPage._id,
				isNoEmail: true,
				page: pageNum++,
				perPage: 20
			});
		} else {
			customersPaged = await get(`customers`, {
				pageId: parentPage._id,
				page: pageNum++,
				perPage: 20
			});
		}

		customersPaged.results.forEach((c) => {
			c.isCollapsed = true;
			return c;
		});

		isCustomersLoading = false;
	};

	loadCustomers();

	let saveCustomer = async (customer) => {
		if (customer._id) {
			let updatedCustomer = await put(
				`customers/${customer._id}?pageId=${parentPage._id || page._id}`,
				customer
			);

			customersPaged.results = customers.map((c) => {
				if (c._id === updatedCustomer._id) {
					updatedCustomer.isCollapsed = true;
					return updatedCustomer;
				}
				return c;
			});
		} else {
			let newCustomer = await post(`customers?pageId=${parentPage._id}`, customer);
			newCustomers = newCustomers.filter((c) => c.email !== newCustomer.email);
			newCustomer.isCollapsed = true;

			customersPaged.results = [newCustomer, ...customersPaged.results];
			customersPaged.count++;
		}

		showSuccessMessage('Customer saved');

		selectedCustomer = null;
	};

	let saveAllNewCustomers = async () => {
		let createdCustomers = await post(`customers/batch?pageId=${parentPage._id}`, {
			customers: newCustomers
		});

		showSuccessMessage(`Saved ${createdCustomers.length} customers`);

		customersPaged.results = [
			...createdCustomers.map((c) => ({ ...c, isCollapsed: true })),
			...customersPaged.results
		];
		customersPaged.count += createdCustomers.length;
		newCustomers = [];
	};

	let parseCSV = async (e) => {
		const reader = new FileReader();

		let parseP = new Promise((resolve, reject) => {
			reader.readAsText(e.target.files[0]);

			reader.onload = async () => {
				const csvContent = reader.result;

				let parsedFile = await csv()
					.fromString(csvContent)
					.preFileLine((fileLine, idx) => {
						if (idx === 0) {
							return fileLine.toLowerCase();
						}
						return fileLine;
					});

				let parsedCustomers = parsedFile.map((item) => {
					return {
						email: item.email,
						fullName: item.name,
						avatarUrl: item.avatar || item.avatarUrl,
						tagsStr: item.tags || item.tagsStr
					};
				});

				resolve(parsedCustomers);
			};
		});

		return parseP;
	};

	let uploadCustomers = async (evt) => {
		let parsedCustomers = await parseCSV(evt);
		newCustomers = [...parsedCustomers, ...newCustomers];
	};

	let loadChatRooms = async () => {
		let result = await get(`customerChatRooms`, {
			customerId: selectedCustomer._id,
			pageId: parentPage._id
		});

		chatRooms = result.results;
	};

	let selectCustomer = async (customer) => {
		selectedCustomer = customer;
		await loadChatRooms();
	};

	let newCustomers = [];

	let sendNewMessage = async () => {
		let chatRoom = await post(
			`customerChatRooms?pageId=${parentPage._id}&customerId=${selectedCustomer._id}`
		);

		chatRooms = [chatRoom, ...chatRooms];

		selectedChatRoom = chatRoom;
	};
</script>

<div class="flex justify-between items-center  mb-4">
	<h3 class="text-lg font-bold">Customers</h3>

	{#if !selectedCustomer}
		<div class="flex items-center gap-2">
			<div
				class="text-sm opacity-70 hover:opacity-100 transition cursor-pointer"
				on:click={() => {}}
			>
				<label class="cursor-pointer block" for="csvfile">
					<FeatherIcon size="17" name="upload" />

					<input id="csvfile" type="file" on:change={uploadCustomers} hidden />
				</label>
			</div>
			<div
				class="text-sm opacity-70 hover:opacity-100 transition cursor-pointer"
				on:click={() => {
					newCustomers = [
						{
							email: '',
							fullName: '',
							avatarUrl: ''
						},
						...newCustomers
					];
				}}
			>
				<FeatherIcon size="17" name="plus" />
			</div>
		</div>
	{/if}
</div>

{#if newCustomers?.length}
	<div class="mb-8">
		Add New Customers
		{#if newCustomers.length > 1}
			<Button class="w-full _secondary _small mt-2" onClick={saveAllNewCustomers}
				>Save {newCustomers.length} customers</Button
			>
		{/if}
	</div>

	{#each newCustomers as newCustomer}
		<EditCustomer
			customer={newCustomer}
			saveCustomer={() => {
				saveCustomer(newCustomer);
			}}
			removeCustomer={() => {
				newCustomers = newCustomers.filter((c) => c !== newCustomer);
			}}
		/>
	{/each}
{:else}
	{#if selectedCustomer}
		<BackTo
			to="Customers List"
			class="mb-4"
			onClick={() => {
				selectedCustomer = null;
				selectedChatRoom = null;
			}}
		/>
	{:else}
		<ToggleGroup
			class="my-4"
			tabs={[
				{
					key: 'customers',
					isSelected: selectedCustomerTab === 'customers',
					name: 'With Email'
				},
				{
					key: 'all',
					isSelected: selectedCustomerTab === 'all',
					name: 'All'
				}
			]}
			onTabSelected={(tab) => {
				selectedCustomerTab = tab.key;
				pageNum = 1;
				loadCustomers();
			}}
		/>
	{/if}

	{#if isCustomersLoading}
		<Loader />
	{:else if customersPaged.results?.length}
		<div class="font-medium mb-2">{customersPaged.count} customers</div>

		{#if selectedCustomer}
			<EditCustomer customer={selectedCustomer} {saveCustomer} />
		{:else}
			{#each customersPaged.results as customer}
				<EditCustomer {customer} isCollapsed onSelected={() => selectCustomer(customer)} />
			{/each}
		{/if}
	{:else}
		<div class="_section _info">You don't have any visitors yet</div>
	{/if}
{/if}

{#if selectedCustomer?.email}
	<div class="font-bold mb-2 mt-8">Chats</div>

	{#if chatRooms.length}
		<div>
			{#each chatRooms as chatRoom}
				<EditChatRoom
					{page}
					{chatRoom}
					isActive={selectedChatRoom?._id === chatRoom._id}
					openChatRoom={() => {
						selectedChatRoom = chatRoom;
					}}
				/>
			{/each}
		</div>
	{:else}
		<div class="_section _info">
			<div class="font-bold mb-2">No chats yet</div>
			<Button class="_primary _small mt-4" onClick={sendNewMessage}>Send message</Button>
		</div>
	{/if}
{/if}
