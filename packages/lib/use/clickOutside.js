/** Dispatch event on click outside of node */
export default (node, isEnabled = true) => {
	const handleClick = (event) => {
		if (isEnabled) {
			if (node && !node.contains(event.target) && !event.defaultPrevented) {
				node.dispatchEvent(new CustomEvent('clickOutside', node));
			}
		}
	};

	document.addEventListener('mouseup', handleClick, true);

	return {
		destroy() {
			document.removeEventListener('mouseup', handleClick, true);
		}
	};
};
