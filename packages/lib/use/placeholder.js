export default (node, placeholder = 'placeholder') => {
	let setPlaceholder = () => {
		if (!node.innerHTML || node.innerHTML === '<br>') {
			node.dataset.placeholder = placeholder;
		} else {
			node.dataset.placeholder = '';
		}
	};

	setPlaceholder();

	node.addEventListener('keydown', (e) => {
		setTimeout(() => {
			setPlaceholder();
		}, 0);
	});

	node.addEventListener('focus', (e) => {
		node.dataset.placeholder = '';
	});

	node.addEventListener('blur', setPlaceholder);
};
