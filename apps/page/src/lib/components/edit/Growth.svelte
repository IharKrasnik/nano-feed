<script>
	export let page;
	export let selectedGrowthTab;
	import FeatherIcon from 'lib/components/FeatherIcon.svelte';
	import { goto } from '$app/navigation';
	import isMomentumWidgetCollapsed from 'lib-render/stores/isMomentumWidgetCollapsed';
	import Modal from 'lib/components/Modal.svelte';
	import KickstartPromo from 'lib/components/KickstartPromo.svelte';

	let isKickstartModalShown;
</script>

{#if isKickstartModalShown}
	<Modal isShown={true} onClosed={() => (isKickstartModalShown = false)}>
		<KickstartPromo />
	</Modal>
{/if}
<div>
	<div
		class="_section cursor-pointer"
		on:click={() => {
			selectedGrowthTab = 'dashboard';
		}}
		class:_selected={selectedGrowthTab === 'dashboard'}
	>
		<div class="flex">
			<div
				class="w-[40px] h-[40px] shrink-0 flex items-center justify-center rounded-full bg-green-300 shadow-md shadow-green-300/50 mr-4"
			>
				<svg
					width="15"
					height="15"
					viewBox="0 0 15 15"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					><path
						d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
						fill="currentColor"
						fill-rule="evenodd"
						clip-rule="evenodd"
					/></svg
				>
			</div>

			<div>
				<div class="font-bold mb-1">Growth Dashboard</div>
				<div class="opacity-80">Monitor your website progress, limits and billing plans</div>
			</div>
		</div>
	</div>

	<div
		class="_section cursor-pointer"
		on:click={() => {
			selectedGrowthTab = 'knowledge-base';
		}}
		class:_selected={selectedGrowthTab === 'knowledge-base'}
	>
		<div class="flex">
			<div
				class="w-[40px] h-[40px] shrink-0 flex items-center justify-center rounded-full bg-yellow-300 shadow-md  shadow-yellow-300/50 mr-4"
			>
				<FeatherIcon name="book-open" class="opacity-80" color="#333333" size="18" />
			</div>

			<div>
				<div class="font-bold mb-1">Knowledge Base</div>
				<div class="opacity-80">Learn how to validate, build and grow startups</div>
			</div>
		</div>
	</div>

	<!-- <div
	class="_section cursor-pointer"
	class:_selected={selectedGrowthTab === 'create'}
	on:click={() => {
		selectedGrowthTab = 'create';
	}}
>
	<div class="flex">
		<div
			class="w-[40px] h-[40px] shrink-0 flex items-center justify-center rounded-full bg-yellow-300 shadow-md  shadow-yellow-300/50 mr-4"
		>
			<svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"
				><path
					d="M7.81819 0.93179C7.64245 0.756054 7.35753 0.756054 7.18179 0.93179L5.43179 2.68179C5.25605 2.85753 5.25605 3.14245 5.43179 3.31819C5.60753 3.49392 5.89245 3.49392 6.06819 3.31819L6.99999 2.38638V5.49999C6.99999 5.77613 7.22385 5.99999 7.49999 5.99999C7.77613 5.99999 7.99999 5.77613 7.99999 5.49999V2.38638L8.93179 3.31819C9.10753 3.49392 9.39245 3.49392 9.56819 3.31819C9.74392 3.14245 9.74392 2.85753 9.56819 2.68179L7.81819 0.93179ZM7.99999 9.49999C7.99999 9.22385 7.77613 8.99999 7.49999 8.99999C7.22385 8.99999 6.99999 9.22385 6.99999 9.49999V12.6136L6.06819 11.6818C5.89245 11.5061 5.60753 11.5061 5.43179 11.6818C5.25605 11.8575 5.25605 12.1424 5.43179 12.3182L7.18179 14.0682C7.35753 14.2439 7.64245 14.2439 7.81819 14.0682L9.56819 12.3182C9.74392 12.1424 9.74392 11.8575 9.56819 11.6818C9.39245 11.5061 9.10753 11.5061 8.93179 11.6818L7.99999 12.6136V9.49999ZM8.99999 7.49999C8.99999 7.22385 9.22385 6.99999 9.49999 6.99999H12.6136L11.6818 6.06819C11.5061 5.89245 11.5061 5.60753 11.6818 5.43179C11.8575 5.25605 12.1424 5.25605 12.3182 5.43179L14.0682 7.18179C14.2439 7.35753 14.2439 7.64245 14.0682 7.81819L12.3182 9.56819C12.1424 9.74392 11.8575 9.74392 11.6818 9.56819C11.5061 9.39245 11.5061 9.10753 11.6818 8.93179L12.6136 7.99999H9.49999C9.22385 7.99999 8.99999 7.77613 8.99999 7.49999ZM3.31819 6.06819L2.38638 6.99999H5.49999C5.77613 6.99999 5.99999 7.22385 5.99999 7.49999C5.99999 7.77613 5.77613 7.99999 5.49999 7.99999H2.38638L3.31819 8.93179C3.49392 9.10753 3.49392 9.39245 3.31819 9.56819C3.14245 9.74392 2.85753 9.74392 2.68179 9.56819L0.93179 7.81819C0.756054 7.64245 0.756054 7.35753 0.93179 7.18179L2.68179 5.43179C2.85753 5.25605 3.14245 5.25605 3.31819 5.43179C3.49392 5.60753 3.49392 5.89245 3.31819 6.06819Z"
					fill="currentColor"
					fill-rule="evenodd"
					clip-rule="evenodd"
				/></svg
			>
		</div>
		<div>
			<div class="font-bold mb-2">Create & Distribute</div>
			<div>Publish content to attract views</div>
		</div>
	</div>
</div>

<div
	class="_section cursor-pointer"
	class:_selected={selectedGrowthTab === 'boost'}
	on:click={() => {
		selectedGrowthTab = 'boost';
	}}
>
	<div class="flex">
		<div
			class="w-[40px] h-[40px] shrink-0 flex items-center justify-center rounded-full bg-purple-300 shadow-md shadow-purple-300/50 mr-4"
		>
			<svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"
				><path
					d="M11.1464 6.85355C11.3417 7.04882 11.6583 7.04882 11.8536 6.85355C12.0488 6.65829 12.0488 6.34171 11.8536 6.14645L7.85355 2.14645C7.65829 1.95118 7.34171 1.95118 7.14645 2.14645L3.14645 6.14645C2.95118 6.34171 2.95118 6.65829 3.14645 6.85355C3.34171 7.04882 3.65829 7.04882 3.85355 6.85355L7.5 3.20711L11.1464 6.85355ZM11.1464 12.8536C11.3417 13.0488 11.6583 13.0488 11.8536 12.8536C12.0488 12.6583 12.0488 12.3417 11.8536 12.1464L7.85355 8.14645C7.65829 7.95118 7.34171 7.95118 7.14645 8.14645L3.14645 12.1464C2.95118 12.3417 2.95118 12.6583 3.14645 12.8536C3.34171 13.0488 3.65829 13.0488 3.85355 12.8536L7.5 9.20711L11.1464 12.8536Z"
					fill="currentColor"
					fill-rule="evenodd"
					clip-rule="evenodd"
				/></svg
			>
		</div>
		<div>
			<div class="font-bold mb-2">Boost Your Product</div>
			<div>Hire an expert to help you grow your product</div>
		</div>
	</div>
</div> -->

	<div class="_section bg-[white] my-8 mt-16 group">
		<div class="flex items-center justify-between w-full">
			<div class="">
				<div class="font-bold">Need $165k in tech discounts? 😏</div>
				<div
					class="flex items-center mt-2 py-1 cursor-pointer"
					on:click={() => {
						isKickstartModalShown = true;
					}}
				>
					<div class="text-sm block underline mr-2">Learn more</div>
					<FeatherIcon name="help-circle" size="13" />
				</div>
				<div class="mt-2">
					Share valuable content in your feed for <b>15 days</b> and get <b>$165k</b> in tech discounts
				</div>
				<div class="py-4 w-full object-image">
					<img
						class="w-full w-full"
						src="https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1703074268413-image.png"
					/>
				</div>
			</div>
		</div>
		<hr class="my-4" />

		<div class="flex items-center justify-between mt-4">
			<div
				on:click={() => {
					$isMomentumWidgetCollapsed = false;
				}}
				class="w-full"
				class:hidden={!page._id}
				target="_blank"
			>
				<button class="_small _secondary" style="border-color: rgb(28 255 54); color: #333333;"
					>🔐 Unlock discounts</button
				>
			</div>
			<!-- https://www.loom.com/share/2d5b3f59bf354f1ead5fba5ebb7a7224?sid=eada9aa6-31ca-4372-b1a4-6cfe47a7a5d4 -->
			<div class="flex items-center">
				<img
					class="max-w-[30px] rounded-full"
					src="https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1703065483491-image.png"
				/>
			</div>
		</div>
	</div>

	<div class="">
		<div class="mb-2 mt-16 font-bold _editor-title text-lg">Design</div>
		<div class="_section bg-[#e9f0ff] my-8">
			<div class="flex items-center justify-between w-full">
				<div class="">
					<div class="font-bold">Need nice images for your social media?</div>

					<div class="mt-2 opacity-80">Get free marketing assets to promote your Momentum page</div>

					<img
						class="py-4 w-full object-cover w-full"
						src="https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1702982490140-image.png"
					/>
				</div>
			</div>
			<hr />
			<div class="flex items-center justify-between  mt-4">
				<a
					href="https://studio.saltnbold.com/new/marketing-assets-promo"
					class="w-full"
					class:hidden={!page._id}
					target="_blank"
				>
					<button class="_small _secondary _promo" style="background-color: #1d60ff;"
						>Design marketing assets →</button
					>
				</a>
				<div class="flex items-center">
					<img
						class="max-w-[30px] rounded-full"
						src="https://assets-global.website-files.com/64831da00244efd7c8280a6c/65253ec34de1359dea9725b8_Ellipse%2019.png"
					/>

					<img
						class="max-w-[30px] ml-[-9px] rounded-full"
						src="https://assets-global.website-files.com/64831da00244efd7c8280a6c/65253eb2822bf3f73eba7826_Ellipse%2014.png"
					/>
					<img
						class="max-w-[30px] ml-[-9px] rounded-full"
						src="https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1703070831964-image.png"
					/>
					<img
						class="max-w-[30px] ml-[-9px] rounded-full"
						src="https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1703070802490-image.png"
					/>
				</div>
			</div>
		</div>

		<div
			class="_section w-full cursor-pointer"
			on:click={() => {
				goto('https://studio.saltnbold.com/new/logo');
			}}
		>
			Logo in 3 days

			<div>
				<div class="inline-block font-semibold mt-1">$159.99</div>
				<div class="inline-block line-through ml-2 mt-1 opacity-70">$679.99</div>
			</div>
		</div>

		<div
			class="_section w-full cursor-pointer"
			on:click={() => {
				goto('https://studio.saltnbold.com/new/ui-ux-prototype');
			}}
		>
			UI/UX prototype in 3 days
			<div>
				<div class="inline-block font-semibold mt-1">$199.99</div>
				<div class="inline-block line-through ml-2 mt-1 opacity-70">$679.99</div>
			</div>
		</div>

		<div
			class="_section w-full cursor-pointer"
			on:click={() => {
				goto('https://studio.saltnbold.com/new/product-demo-video');
			}}
		>
			Product Video in 5 days
			<div>
				<div class="inline-block font-semibold mt-1">$679.99</div>
				<div class="inline-block line-through ml-2 mt-1 opacity-70">$1,179.99</div>
			</div>
		</div>

		<div class="mb-2 mt-16 font-bold _editor-title text-lg">Build</div>

		<div class="_section my-8 group bg-[#ffe9fa]" style="border-color: rgb(216 142 210 / 60%);">
			<div class="flex items-center justify-between w-full">
				<div class="">
					<div class="font-bold">Ready to build?</div>
					<div class="mt-2">
						Hire our team — we've built the <a
							class="underline"
							href="https://paralect.com/companies"
							target="_blank">dozens</a
						> of MVPs before.
					</div>
					<div class="my-2">
						✓ Web applications <br />
						✓ UI/UX + marketing design <br />
						✓ Full-stack JavaScript, AI and APIs<br />
						✓ No-code automation
					</div>

					<div class="mt-2 opacity-80" />

					<div class="py-4 w-full object-image">
						<img
							class="w-full w-full rounded"
							src="https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1703069591390-image.png"
						/>
					</div>
				</div>
			</div>

			<div class="flex text-xl my-4 justify-between">
				<div class="flex items-end opacity-90">
					<div class="font-semibold">$6,000</div>
					<div class="ml-2 text-sm">total price</div>
				</div>

				<div class="flex items-end opacity-90">
					<div class="ml-6 font-semibold">2 weeks</div>
					<div class="ml-2 text-sm">build time</div>
				</div>
			</div>

			<hr />

			<div class="flex items-center justify-between  mt-4">
				<div
					on:click={() => {
						goto('https://build.paralect.com/');
					}}
					class="w-full"
					class:hidden={!page._id}
					target="_blank"
				>
					<button
						class="_small _secondary"
						style="background-color: rgb(198 29 255); color: #f6f5f4; border-color: #7900a2;"
						>Build my MVP →</button
					>
				</div>

				<div class="flex items-center">
					<img
						class="max-w-[30px] rounded-full"
						src="https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1703069109699-image.png"
					/>
					<img
						class="max-w-[30px] ml-[-8px] rounded-full"
						src="https://pbs.twimg.com/profile_images/1699084265974030336/7AFDmfHM_400x400.jpg"
					/>
					<img
						class="max-w-[30px] ml-[-8px] rounded-full"
						src="https://pbs.twimg.com/profile_images/1679050978933329920/1T4q1SuX_400x400.jpg"
					/>
				</div>
			</div>
		</div>

		<div class="mb-2 mt-16 font-bold _editor-title text-lg">Content</div>
		<div class="_section bg-[#feffe9] my-8 group">
			<div class="flex items-center justify-between w-full">
				<div class="">
					<div class="font-bold">Have something to tell?</div>

					<div class="mt-2 opacity-80">Join the 15-minutes podcast and promote your product</div>

					<div class="py-4 w-full object-image">
						<img
							class="group-hover:hidden h-[186px]"
							src="https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1703062395534-image.png"
						/>
						<img
							class="w-full object-cover w-full hidden group-hover:block h-[186px]"
							src="https://fra1.digitaloceanspaces.com/ship-app-assets/stream/recEyMKJycFOIWyqd/1678363110857-Trimmed_2_AdobeExpress.gif"
						/>
					</div>
				</div>
			</div>
			<hr />
			<div class="flex items-center justify-between  mt-4">
				<a
					href="https://twitter.com/John__McT"
					class="w-full"
					class:hidden={!page._id}
					target="_blank"
				>
					<button
						class="_small _secondary _promo"
						style="background-color: #e0fc03; color: #333333;">Get my podcast →</button
					>
				</a>
				<div class="flex items-center">
					<img
						class="max-w-[30px] rounded-full"
						src="https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1703063111928-image.png"
					/>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- <div class="_section cursor-pointer">
	<div class="flex">
		<div
			class="w-[40px] h-[40px] shrink-0 flex items-center justify-center rounded-full bg-purple-300 shadow-md shadow-purple-300/50 mr-4"
		>
			<FeatherIcon name="credit-card" size="20" color="#333" />
		</div>
		<div>
			<div class="font-bold mb-2">Billing</div>
			<div>Manage payments and upgrade</div>
		</div>
	</div>
</div> -->
