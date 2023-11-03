<script>
	import feather from 'feather-icons/dist/icons.json';

	export let size = '24';
	export let strokeWidth = 2;
	let customClass = '';
	export { customClass as class };

	export let name = 'cpu';
	export let color = '#111';

	if (size !== '100%') {
		size = size.slice(-1) === 'x' ? size.slice(0, size.length - 1) + 'em' : parseInt(size) + 'px';
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
