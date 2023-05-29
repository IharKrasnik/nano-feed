export default (node) => {
	node.addEventListener('paste', function (e) {
		e.preventDefault();
		var text = e.clipboardData.getData('text/plain');
		document.execCommand('insertText', false, text);
	});
};
