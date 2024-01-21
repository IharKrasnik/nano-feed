<script>
	import moment from 'moment';
	import { get, post, put } from 'lib/api';
	export let page;
	export let section;
	import currentCustomer from 'lib/stores/currentCustomer';
	import CustomerAvatar from 'lib-render/components/CustomerAvatar.svelte';
	import RenderForm from 'lib-render/components/render/Form.svelte';

	let comments = [];

	let loadComments = async () => {
		let { results } = await get(`pages/${page._id}/comments`, {
			sectionId: section.id
		});

		comments = results;
	};

	let newComment = {
		message: ''
	};

	loadComments();

	const formSection = {
		title: 'Leave a Reply',
		callToActionText: 'Send Reply',
		items: [
			{
				title: 'Your Email',
				interactiveRenderType: 'email'
			},
			{
				title: 'Your Name',
				interactiveRenderType: 'name'
			},
			{
				varName: 'message',
				title: 'Your Comment',
				interactiveRenderType: 'textarea'
			}
		]
	};

	let sendComment = async ({ message }) => {
		if (!$currentCustomer.isAuthorized) {
			await put(
				`customers/current?pageId=${page._id}`,
				$currentCustomer.isAuthorized
					? {}
					: {
							email: $currentCustomer.email,
							fullName: $currentCustomer.fullName,
							avatarUrl: $currentCustomer.avatarUrl
					  }
			);
		}

		let { comment } = await post(`pages/${page._id}/comments`, {
			sectionId: section.id,
			message
		});

		comments = [comment, ...comments];
	};
</script>

<div class="max-w-[800px] mx-auto">
	{#if comments?.length}
		<div class="_section-item p-8 mt-8">
			{#each comments as comment}
				<div class="flex items-start p-4 mb-8">
					<div class="mr-4">
						<CustomerAvatar size={42} customer={comment.fromCustomer} />
					</div>
					<div>
						<div class="font-bold">{comment.fromCustomer.fullName}</div>
						<div class="text-sm opacity-70 mb-4">
							{moment(comment.createdOn).format('MMM DD, HH:mm ')}
						</div>

						<div class="whitespace-pre-wrap">
							{@html comment.messageHTML}
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}

	<div class="mt-8">
		<RenderForm
			handleSubmit={async ({ postData }) => {
				await sendComment({
					message: postData.vars.message
				});
			}}
			section={formSection}
			{page}
		/>
	</div>
</div>
