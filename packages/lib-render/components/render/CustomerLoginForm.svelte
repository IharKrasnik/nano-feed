<script>
	let clazz = '';
	import { get, post } from 'lib/api';
	import currentCustomer from 'lib/stores/currentCustomer';
	import RenderForm from 'lib-render/components/render/Form.svelte';
	import Cookies from 'js-cookie';

	export { clazz as class };
	export let page;
	export let onLogin = () => {};
</script>

<div class={clazz}>
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
			callToActionText: 'Log In →',
			ctaExplainer: 'Send 4-digits code to your email'
		}}
	/>
</div>
