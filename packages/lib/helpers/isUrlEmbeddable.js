export default (url = '') => {
	return (
		url.includes('substack.com/embed') || url.includes('cal.com/') || url.includes('tally.so/r')
	);
};
