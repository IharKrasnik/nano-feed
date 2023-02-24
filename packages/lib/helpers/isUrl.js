const isValidUrl = (urlString) => {
	try {
		new URL(urlString);
		return true;
	} catch {
		return false;
	}
};

export default isValidUrl;

// export default (str) => {
// 	let url;

// 	if (!str.startsWith('http')) {
// 		str = `https://${url}`;
// 	}

// 	try {
// 		url = new URL(str);
// 	} catch (_) {
// 		return false;
// 	}
// 	return url.protocol === 'http:' || url.protocol === 'https:';
// };
