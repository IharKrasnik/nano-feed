<script>
	import feather from 'feather-icons/dist/icons.json';

	export let size = '24';
	export let strokeWidth = 2;
	let customClass = '';
	export { customClass as class };

	export let name = 'cpu';
	export let color = '#111';
	export let theme;

	if (theme) {
		if (theme === 'dark') {
			color = '#f6f5f4';
		} else {
			color = '#111111';
		}
	}
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	width={size}
	height={size}
	fill="none"
	viewBox="0 0 24 24"
	stroke={color || 'currentColor'}
	stroke-width={strokeWidth}
	stroke-linecap="round"
	stroke-linejoin="round"
	class="feather feather-{name} {customClass}">{@html feather[name]}</svg
>

<i data-feather={name} />

<style>
	svg {
	}
</style>
