<!-- This code reads images and gifs on clipboard paste
Use it for your rich text editors so your users can edit content fast -->
<script>
	import { uploadFile } from 'myApi';

	const pasteImage = (evt) => {
		Array.from(evt.clipboardData.files).forEach(async (file) => {
			if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
				uploadFile(file);
			}
		});
	};
</script>

<!-- Here's how you use it in your Html Markup (Svelte Here) -->

<div contenteditable="" on:paste={pasteImage} />
<input on:paste={pasteImage} />
<textarea on:paste={pasteImage} />
