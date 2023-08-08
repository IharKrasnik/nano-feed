let getDomain = (href) => {
	let match = /:\/\/([^\/]+)/.exec(href);
	if (match) {
		return match[1];
	} else {
		return href;
	}
};

export default getDomain;
