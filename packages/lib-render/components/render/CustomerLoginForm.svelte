<script>
	let clazz = '';
	import RenderForm from 'lib-render/components/render/Form.svelte';

	export let isForceLoginCode = false;
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
			isForceLoginCode,
			onSubmitted: onLogin,
			items: [
				{
					interactiveRenderType: 'email',
					title: 'Email'
				}
			],
			callToActionText: 'Continue →',
			ctaExplainer: ''
		}}
	/>
</div>
