<script>
	import { get, post, del } from 'lib/api';
	import Button from 'lib/components/Button.svelte';
	import { showSuccessMessage } from 'lib/services/toast';

	export let page;
	let parentPage = page.parentPage || page;

	let newInviteeEmail = '';

	let pageInvitations = [];

	let refreshPageInvitations = async () => {
		pageInvitations = await get('pageInvitations', {
			pageId: parentPage._id
		});
	};
	refreshPageInvitations();

	let inviteToPage = async () => {
		let { newEditor, pageInvitation } = await post(`pages/${parentPage._id}/editors`, {
			email: newInviteeEmail
		});

		if (newEditor) {
			parentPage.editors = parentPage.editors || [];
			parentPage.editors.push(newEditor);
			showSuccessMessage(`Added ${newEditor.fullName} as an editor`);
		} else {
			pageInvitations = [pageInvitation, ...pageInvitations];
			showSuccessMessage(`Invitation was sent to ${newInviteeEmail}`);
		}
	};

	let cancelPageInvitation = async (pageInvitation) => {
		await del(`pageInvitations/${pageInvitation._id}?pageId=${parentPage._id}`);

		pageInvitations = pageInvitations.filter((pi) => pi._id !== pageInvitation._id);
		showSuccessMessage(`Invitation to ${pageInvitation.toEmail} was cancelled`);
	};

	let removeEditor = async (editor) => {
		await del(`pages/${parentPage._id}/editors/${editor._id}`);
		parentPage.editors = parentPage.editors.filter((e) => e._id !== editor._id);
		showSuccessMessage(`${editor.fullName} no longer able to edit ${parentPage.name} now`);
	};
</script>

<h3 class="text-xl font-bold mb-2">Team</h3>
<div class="text-sm mb-4">Invite your team to edit page together</div>

<div class="flex items-center">
	<input placeholder="igor@paralect.com" bind:value={newInviteeEmail} />
	<Button class="_primary _small ml-2" onClick={inviteToPage}>Invite Editor</Button>
</div>

{#if !parentPage.editors?.length && !pageInvitations?.length}
	<div class="_section _info mt-4">
		<div class="font-bold mb-2">No editors yet</div>
		<div class="">Invite your team to edit your pages and access other Momentum tools</div>
	</div>
{/if}

{#if parentPage.editors?.length}
	<div class="font-bold mb-2 mt-8">Page Editors</div>

	{#each parentPage.editors || [] as editor}
		<div class="flex justify-between">
			<div class="flex items-center">
				<img class="rounded-full w-[30px] h-[30px] mr-2" src={editor.avatarUrl} />

				<div>
					{editor.fullName}
				</div>
			</div>

			<div>
				<Button class="_secondary _small" onClick={() => removeEditor(editor)}>Remove</Button>
			</div>
		</div>
	{/each}
{/if}

{#if pageInvitations.length}
	<div class="font-bold mb-2 mt-8">Pending Invitations</div>
	{#each pageInvitations as pageInvitation}
		<div class="flex justify-between">
			<div>{pageInvitation.toEmail}</div>
			<div>
				<Button class="_secondary _small" onClick={() => cancelPageInvitation(pageInvitation)}
					>Cancel</Button
				>
			</div>
		</div>
	{/each}
{/if}
