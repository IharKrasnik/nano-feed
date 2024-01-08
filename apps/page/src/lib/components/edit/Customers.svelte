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
	import csv from 'csvtojson';
	import { showSuccessMessage } from 'lib/services/toast';

	export let page;
	let parentPage = page.parentPage || page;

	export let selectedCustomer;

	let customers = [];

	let selectedCustomerTab = 'all';

	let isCustomersLoading = false;

	let loadCustomers = async () => {
		let customerResult;
		isCustomersLoading = true;

		if (selectedCustomerTab === 'customers') {
			customerResult = await get(`customers`, {
				pageId: parentPage._id,
				isWithEmail: true
			});
		} else if (selectedCustomerTab === 'visitors') {
			customerResult = await get(`customers`, {
				pageId: parentPage._id,
				isNoEmail: true
			});
		} else {
			customerResult = await get(`customers`, { pageId: parentPage._id });
		}

		customers = customerResult.results.map((c) => {
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
			customers = customers.map((c) => {
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

			customers = [newCustomer, ...customers];
		}

		showSuccessMessage('Customer saved');

		selectedCustomer = null;
	};

	let saveAllNewCustomers = async () => {
		let createdCustomers = await post(`customers/batch?pageId=${parentPage._id}`, {
			customers: newCustomers
		});

		showSuccessMessage(`Saved ${createdCustomers.length} customers`);

		customers = [...createdCustomers.map((c) => ({ ...c, isCollapsed: true })), ...customers];
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

	let newCustomers = [];
</script>

<div class="flex justify-between items-center  mb-4">
	<h3 class="text-lg font-bold">Customers</h3>

	<div class="flex items-center gap-2">
		<div class="text-sm opacity-70 hover:opacity-100 transition cursor-pointer" on:click={() => {}}>
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
	<ToggleGroup
		class="my-4"
		tabs={[
			{
				key: 'all',
				isSelected: selectedCustomerTab === 'all',
				name: 'All'
			},
			{
				key: 'customers',
				isSelected: selectedCustomerTab === 'customers',
				name: 'With Email'
			},

			{
				key: 'visitors',
				isSelected: selectedCustomerTab === 'visitors',
				name: 'Anonymous'
			}
		]}
		onTabSelected={(tab) => {
			selectedCustomerTab = tab.key;
			loadCustomers();
		}}
	/>

	{#if isCustomersLoading}
		<Loader />
	{:else if customers?.length}
		{#each customers as customer}
			<EditCustomer
				{customer}
				{saveCustomer}
				onSelected={() => {
					selectedCustomer = customer;

					customers = customers.map((c) => {
						c.isCollapsed = true;
						if (c._id === customer._id) {
							c.isCollapsed = false;
						}
						return c;
					});
				}}
			/>
		{/each}
	{:else}
		<div class="_section _info">You don't have any visitors yet</div>
	{/if}
{/if}
