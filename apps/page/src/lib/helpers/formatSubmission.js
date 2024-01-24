export default (submission) => {
	if (submission.vars) {
		return Object.keys(submission.vars)
			.map((varName) => submission.vars[varName])
			.join('; ');
	} else {
		return submission.email || submission.name;
	}
};
