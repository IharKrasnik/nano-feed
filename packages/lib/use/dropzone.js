import { fromEvent } from 'file-selector';

export default (node) => {
	node.addEventListener('drop', async (evt) => {
		const files = await fromEvent(evt);
		node.dispatchEvent(new CustomEvent('filedrop', { detail: { files } }));
		evt.preventDefault();
	});
};
