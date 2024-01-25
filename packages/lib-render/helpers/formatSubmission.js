export default (submission) => {
	if (submission.title) {
		return submission.title;
	}
	if (submission.vars) {
		return Object.keys(submission.vars)
			.map((varName) => submission.vars[varName])
			.join('; ');
	} else {
		return submission.email || submission.name;
	}
};
