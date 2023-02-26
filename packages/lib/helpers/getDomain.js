let getDomain = (href) => {
	return /:\/\/([^\/]+)/.exec(href)[1];
};

export default getDomain;
