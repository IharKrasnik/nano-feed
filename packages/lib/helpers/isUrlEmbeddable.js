export default (url = '') => {
	return (
		url.includes('substack.com/embed') ||
		url.includes('tally.so/r') ||
		url.includes('videoask') ||
		url.includes('typeform') ||
		url.includes('stackblitz')
	);
};
