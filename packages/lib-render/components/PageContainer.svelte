<script>
	import getPageCssStyles from 'lib-render/services/getPageCssStyles';

	let clazz = '';
	export { clazz as class };

	export let page;

	let cssVarStyles;
	let styles;

	$: if (page) {
		let res = getPageCssStyles(page);
		cssVarStyles = res.cssVarStyles;
		styles = res.styles;
	}
</script>

<div style={cssVarStyles} class="bg-background {clazz}">
	<slot />
</div>
