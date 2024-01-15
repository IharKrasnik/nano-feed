<script>
	import { get, post } from 'lib/api';
	import currentCustomer from 'lib/stores/currentCustomer';
	import RenderForm from 'lib-render/components/render/Form.svelte';
	import Cookies from 'js-cookie';

	export let page;
	export let onLogin = () => {};
</script>

<div>
	<RenderForm
		{page}
		section={{
			id: 'login',
			isAuthRequired: true,
			onSubmitted: onLogin,
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
