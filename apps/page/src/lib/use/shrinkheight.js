export default (node) => {
	if (!node.style.height) {
		node.style.height = Math.ceil(node.clientHeight / 2) + 'px';
	}
};
