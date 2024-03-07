export default (num, total) => {
	if (!total) {
		return '0%';
	}
	return Math.floor((num / total) * 100) + '%';
};
