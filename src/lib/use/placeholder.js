export default (node, placeholder = 'placeholder') => {
	node.innerHTML === '' && (node.innerHTML = placeholder);

	node.addEventListener('focus', function (e) {
		const value = e.target.innerHTML;
		value === placeholder && (e.target.innerHTML = '');
	});

	node.addEventListener('blur', function (e) {
		const value = e.target.innerHTML;
		value === '' && (e.target.innerHTML = placeholder);
	});
};
