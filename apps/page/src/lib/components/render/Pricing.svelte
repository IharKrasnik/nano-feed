<script>
	import RenderSection from '$lib/components/render/Section.svelte';
	let pricing = {
		title: 'Pricing',
		description: 'Flexible pricing plan that suits all your needs',
		plans: [
			{
				// imageUrl: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
				name: 'Bloom',
				description: 'Free 5 FemmeStock images deliver to your inbox very monthh',
				callToAction: {
					text: 'Get Started',
					url: 'asd'
				},

				pricing: {
					price: 0,
					pricePer: 'month',
					benefits: [{ name: 'free 5 stock images deliver to your inbox very month' }]
				}
			},
			{
				name: 'Luxe',
				description: '50 AI stock images deliver to your inbox every month',

				callToAction: {
					text: 'Subscribe',
					url: 'asd'
				},

				pricing: {
					price: 39,
					pricePer: 'month',
					benefits: [
						{ name: '50 stock images deliver to your inbox on 1st of every month' },
						{ name: 'Cancel anytime' }
					]
				}
			}
		]
	};

	let section = {
		columns: 2,
		items: pricing.plans.map((p) => {
			return {
				title: p.name,
				description: p.description,
				imageUrl: p.imageUrl,
				callToActionText: p.callToAction.text,
				url: p.callToAction.url,

				pricing: p.pricing
			};
		})
	};
</script>

<div class="sticky z-20 bg-white">
	__d
	<div class="max-w-[800px] mx-auto">
		<RenderSection
			class="p-0"
			section={{
				columns: 1,
				items: [
					{
						title: pricing.title,
						description: pricing.description
					}
				]
			}}
		/>

		<div class="p-4 sm:p-8">
			<RenderSection class="p-0" {section} />
		</div>
		<!-- <div class="grid sm:grid-cols-2 gap-2 sm:gap-4 mt-8">
			{#each pricing.plans as plan}
				<div
					class="m-4 sm:m-0 p-4 sm:p-6 bg-[#fafafa] rounded-xl flex flex-col sm:justify-between sm:h-full"
				>
					<div>
						<div class="text-xl font-bold">{plan.name}</div>
						<div class="">{plan.description}</div>

						<div class="flex items-end mt-2 mb-4">
							<div class="text-3xl font-bold mr-2">${plan.price}</div>
							<div class="text-lg">
								/{plan.per}
							</div>
						</div>
						<div class="mb-4">
							{#each plan.benefits as benefit}
								<div class="my-2"><span class="inline-block mr-2">✅</span> {benefit.name}</div>
							{/each}
						</div>
					</div>
					<div>
						<div class="my-4 w-full">
							<a class="button w-full text-center" href={plan.callToAction.url} target="_blank"
								>{plan.callToAction.text}</a
							>
						</div>
					</div>
				</div>
			{/each}
		</div> -->
	</div>
</div>

<style>
	button,
	.button {
		display: inline-block;
		border-radius: var(--button-radius);
		padding: 5px 20px;
		font-size: 18px;

		color: white;
		background-color: var(--accent-color);
	}
</style>
