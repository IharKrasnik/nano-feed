<script>
	import CodeMirror from 'svelte-codemirror-editor';
	import { css } from '@codemirror/lang-css';
	import { json } from '@codemirror/lang-json';
	import { svelte } from '@replit/codemirror-lang-svelte';

	import { duotoneLight, duotoneDark } from '@uiw/codemirror-theme-duotone';

	let clazz = 'w-full';

	export { clazz as class };

	export let language = '';
	export let value;
	export let onChange = () => {};

	let langs = {
		css: css(),
		json: json(),
		svelte: svelte()
	};
</script>

<CodeMirror
	bind:value
	on:change={onChange}
	lineWrapping={true}
	class={clazz}
	theme={duotoneLight}
	lang={langs[language]}
/>
