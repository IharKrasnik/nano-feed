<script>
	import { postFile } from 'lib/api';
	import { onMount } from 'svelte';

	import isShowContentEditableMenu from 'lib/stores/isShowContentEditableMenu';
	import clickOutside from 'lib/use/clickOutside';
	import ContentEditableMenu from 'lib/components/ContentEditableMenu.svelte';
	import RenderUrl from 'lib/components/RenderUrl.svelte';

	let isLoading;
	let control;
	let clazz = '';

	export let value;
	export { clazz as class };

	export let isWithMenu = false;

	const uploadFile = async (file) => {
		isLoading = true;

		try {
			const newFile = await postFile('files', file);

			let fileUrl = newFile.url.startsWith('http') ? newFile.url : `https://${newFile.url}`;

			return fileUrl;

			// dispatch('fileUploaded', {
			// 	type: newFile.url.includes('.mp4') || newFile.url.includes('.mov') ? 'video' : 'image',
			// 	url: fileUrl
			// });
		} finally {
			isLoading = false;
		}
	};

	const pasteImage = async (e, text) => {
		if (
			text &&
			(text.includes('.jpg') ||
				text.includes('.jpeg') ||
				text.includes('.png') ||
				text.includes('.gif'))
		) {
			document.execCommand('insertHTML', false, `<img src="${text}"/>`);
			return true;
		}

		let isFile = false;

		Array.from(e.clipboardData.files).forEach(async (file) => {
			if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
				let url = await uploadFile(file);

				document.execCommand('insertHTML', false, `<img src="${url}"/>`);

				isFile = true;
			} else if (file.type.startsWith('text/')) {
				// const textarea = document.createElement('textarea');
				// textarea.value = await file.text();
				// document.body.append(textarea);
			}
		});

		return isFile;
	};

	let nodeEl;

	function saveSelection() {
		if (window.getSelection) {
			let sel = window.getSelection();

			if (sel.getRangeAt && sel.rangeCount) {
				var ranges = [];
				for (var i = 0, len = sel.rangeCount; i < len; ++i) {
					ranges.push(sel.getRangeAt(i));
				}
				return ranges;
			}
		} else if (document.selection && document.selection.createRange) {
			return document.selection.createRange();
		}

		return null;
	}

	let savedSelection;

	function restoreSelection() {
		if (window.getSelection) {
			let sel = window.getSelection();
			sel.removeAllRanges();
			for (var i = 0, len = savedSelection.length; i < len; ++i) {
				sel.addRange(savedSelection[i]);
			}
		} else if (document.selection && savedSelection.select) {
			savedSelection.select();
		}
	}

	let insertYoutube = (url) => {
		let divEl = document.createElement('div');

		let d = new RenderUrl({ target: divEl, props: { url } });

		document.execCommand('insertHTML', false, divEl.innerHTML);
	};

	function createLink(url) {
		// var savedSel = saveSelection();
		// restoreSelection(savedSel);

		if (url.includes('youtu.be') || url.includes('youtube.com')) {
			return insertYoutube(url);
		}

		document.execCommand('CreateLink', false, url);
	}

	let onFormat = ({ detail }) => {
		restoreSelection(savedSelection);

		let { type } = detail;

		if (type === 'h3' || type === 'h2' || type === 'h1') {
			document.execCommand(
				'insertHTML',
				false,
				`<${type} class="test">${window.getSelection()}</${type}>`
			);
		} else if (type === 'regular') {
			let selection = window.getSelection();

			selection.anchorNode.parentNode.replaceWith(selection.anchorNode);
			// document.execCommand('formatBlock', false, 'span');
			// document.execCommand('insertText', false, window.getSelection());
		}

		$isShowContentEditableMenu = false;
	};

	let menuPosition = {
		top: 0,
		left: 0
	};

	let menuStyle;

	let onpointerup = () => {
		// if (isWithMenu) {
		// 	onMount(() => {
		// 		// document.onpointerdown = () => {
		// 		// 	if (control !== null) {
		// 		// 		control.remove();
		// 		// 		document.getSelection().removeAllRanges();
		// 		// 	}
		// 		// };
		// 	});
		// }

		let selection = document.getSelection(),
			text = selection.toString();

		if (text !== '') {
			window.range = selection.getRangeAt(0);
			let rect = range.getBoundingClientRect();

			console.log('rect', rect);

			menuPosition.top = `calc(${rect.top}px + 40px)`;
			menuPosition.left = `calc(${rect.left}px - 30px)`;

			menuStyle = `top: ${menuPosition.top}; left: ${menuPosition.left};`;
			console.log('menuStyle', menuStyle);
			// control.text = text;

			savedSelection = saveSelection();

			setTimeout(() => {
				$isShowContentEditableMenu = true;
			});
		}
	};

	let onPaste = async (e) => {
		e.preventDefault();

		let text = e.clipboardData.getData('text/plain');

		if (await pasteImage(e, text)) {
			return;
		}

		if (text.startsWith('http')) {
			createLink(text);
		} else {
			document.execCommand('insertText', false, text);
		}
	};
</script>

<div>
	<div class="fixed z-10 rounded-lg opacity-90" style={menuStyle}>
		{#if $isShowContentEditableMenu}
			<div
				use:clickOutside
				on:clickOutside={() => {
					$isShowContentEditableMenu = false;
				}}
			>
				<ContentEditableMenu on:format={onFormat} />
			</div>
		{/if}
	</div>

	<div
		class={clazz}
		contenteditable
		bind:innerHTML={value}
		on:pointerup={onpointerup}
		on:paste={onPaste}
	/>
</div>
