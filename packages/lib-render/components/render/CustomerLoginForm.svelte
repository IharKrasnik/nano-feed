<script>
	import { get, post } from 'lib/api';
	import currentCustomer from 'lib/stores/currentCustomer';
	import RenderForm from 'lib-render/components/render/Form.svelte';
	import Cookies from 'js-cookie';

	export let page;

	// syncConfig = {
	// 	page: { _id: '' },

	// 	keys: {
	// 		api: { signToken: '' },
	// 		zapier: { apiToken }
	// 	},

	// 	events: {
	// 		'user:created': [
	// 			{
	// 				type: 'api',
	// 				userSyncUrl: '',
	// 				userAuthUrl: '',
	// 				signToken: ''
	// 			},
	// 			{
	// 				type: 'slack',
	// 				slackWebhookUrl: ''
	// 			},
	// 			{
	// 				type: 'zapier',
	// 				token: '',
	// 				zapId: ''
	// 			}
	// 		],
	// 		'customerMessage:created': [
	// 			{
	// 				type: 'slack',
	// 				slackWebhookUrl: ''
	// 			}
	// 		],
	// 		'analyticsReport:created': [
	// 			{
	// 				type: 'email',
	// 				filter: [{ label: 'stuff' }],
	// 				to: 'email@email.com'
	// 			}
	// 		]
	// 	}
	// };
</script>

<div>
	<RenderForm
		{page}
		handleSubmit={async ({ postData }) => {
			let email = { postData };

			let { customer, token } = await post(`customers/auth?pageId=${page._id}`, {
				email
			});

			$currentCustomer = customer;
			Cookies.set('customer_access_token', token);
		}}
		section={{
			id: 'login',
			items: [
				{
					interactiveRenderType: 'email',
					title: 'Email'
				}
			],
			callToActionText: 'Log In →'
		}}
	/>
</div>
