<script>
	import { onDestroy, onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
	import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
	import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
	import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
	import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

	export let codeFile;
	export let language = 'javascript';
	export let onSave = (file) => {};
	export let readOnly = false;

	let savedDiv;

	let divEl = null;
	let editor;
	let Monaco;

	self.MonacoEnvironment = {
		getWorker: function (_moduleId, label) {
			if (label === 'json') {
				return new jsonWorker();
			}
			if (label === 'css' || label === 'scss' || label === 'less') {
				return new cssWorker();
			}
			if (label === 'html' || label === 'handlebars' || label === 'razor') {
				return new htmlWorker();
			}
			if (label === 'typescript' || label === 'javascript') {
				return new tsWorker();
			}
			return new editorWorker();
		}
	};

	onMount(async () => {
		Monaco = await import('monaco-editor');

		editor = Monaco.editor.create(divEl, {
			model: null
		});

		const model = Monaco.editor.createModel(codeFile, language);

		editor.setModel(model);

		import('monaco-themes/themes/Dracula.json').then((data) => {
			Monaco.editor.defineTheme('dracula', data);
			Monaco.editor.setTheme('dracula');
		});

		editor.getModel().onDidChangeContent((event) => {
			codeFile = editor.getValue();
		});

		// editor.addCommand(Monaco.KeyMod.CtrlCmd | Monaco.KeyCode.KeyS, function () {
		// 	if (editor) {
		// 		dispatch('save', {
		// 			codeFile
		// 		});
		// 	}
		// });
	});

	onDestroy(() => {
		editor.getModel().dispose();
		editor.dispose();
		editor = null;
	});

	const handleKeydown = (e) => {
		if (e.keyCode === 83 && (navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey)) {
			if (!readOnly) {
				dispatch('save', {
					codeFile
				});

				savedDiv.style.opacity = 1;

				setTimeout(() => {
					savedDiv.style.opacity = 0;
				}, 1000);
			}

			e.preventDefault();
			e.stopPropagation();
		}
	};
</script>

<div class="relative" on:keydown={handleKeydown}>
	<div bind:this={divEl} class="h-[600px] monaco-editor" />

	<div
		class="absolute bottom-0 bg-[#166534] w-full text-center transition py-1 opacity-0"
		bind:this={savedDiv}
	>
		Saved
	</div>
</div>

<style>
</style>
