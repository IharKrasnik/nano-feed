const isValidUrl = (urlString) => {
	var inputElement = document.createElement('input');
	inputElement.type = 'url';
	inputElement.value = urlString;

	if (!inputElement.checkValidity()) {
		return false;
	} else {
		return true;
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
