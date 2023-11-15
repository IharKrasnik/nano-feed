import config from './config';

const API_URL = process.env.BUILD === 'dev' ? config.API_URL_DEV : config.API_URL;
// const API_URL = config.API_URL_DEV;

const CLASS_DIVIDER = / /g;

export const DEFAULT_DEBOUNCE_TIME = 500;
export const DEFAULT_THROTTLE_TIME = 1000;

const getParents = (element) => {
	const parents = [];

	// eslint-disable-next-line no-param-reassign
	for (; element && element !== document; element = element.parentNode) {
		parents.push(element);
	}

	return parents;
};

const getCountSameNodeName = (elementsArray, element) => {
	let count = 0;

	[...elementsArray].forEach((currentElement) => {
		if (currentElement.nodeName.toLowerCase() === element.nodeName.toLowerCase()) {
			count += 1;
		}
	});

	return count;
};

const getNthNumber = (element) => {
	let nth = 1;

	// eslint-disable-next-line no-cond-assign,no-param-reassign
	while ((element = element.previousElementSibling)) {
		nth += 1;
	}

	return nth;
};

export const getCssPath = (element) => {
	let elementParents = getParents(element);
	elementParents = elementParents.splice(0, elementParents.length - 1);

	const selectorsArray = [];

	for (let i = 0; i < elementParents.length; i += 1) {
		const elementItem = elementParents[i];

		const nodeName = elementItem.nodeName.toLowerCase();

		let id = '';
		let selector = '';

		if (elementItem.id) {
			id = `#${elementItem.id}`;
		}

		if (id) {
			selector = id;
			selectorsArray.push(selector);
			break;
		} else {
			selector = nodeName;
			const { parentNode } = elementItem;

			if (parentNode) {
				const sibling = parentNode.children;
				const countSameNodeName = getCountSameNodeName(sibling, elementItem);

				if (sibling.length > 1 && countSameNodeName > 1) {
					const classNames = elementItem.className
						? `.${elementItem.className.replace(CLASS_DIVIDER, '.')}`
						: '';

					if (classNames) {
						selector += classNames;
					} else {
						const nthNumber = getNthNumber(elementItem);
						selector += `:nth-child(${nthNumber})`;
					}
				}
			}
		}

		selectorsArray.push(selector);
	}

	const resultPath = selectorsArray.reverse().join(' > ');

	return resultPath;
};

export const getValue = (element) => {
	return `${element.value || element.innerText || ''}`;
};

export const sendData = (url, data) =>
	fetch(`${window.WAVE_API_URL || API_URL}/${url}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	}).then((response) => response.json());

export const sendTrackData = (userData, url, data) =>
	sendData(url, {
		...data,
		projectId: userData.projectId,
		visitorId: userData.visitorId,
		sessionId: userData.sessionId,
		subProjectId: window.WAVE_SUBPROJECT_ID
	}).then((trackData) => {
		if (trackData.sessionId) {
			// eslint-disable-next-line no-param-reassign
			userData.sessionId = trackData.sessionId;
		}

		return trackData;
	});

export const sendTrackEvent = ({ type, timestamp = Date.now(), payload }) => {
	let userData = window.WAVE_USER_DATA;

	return sendData('waveActions', {
		projectId: userData.projectId,
		visitorId: userData.visitorId,
		sessionId: userData.sessionId,
		subProjectId: window.WAVE_SUBPROJECT_ID,

		type,
		timestamp,
		payload
	}).then((trackData) => {
		if (trackData.sessionId) {
			// eslint-disable-next-line no-param-reassign
			userData.sessionId = trackData.sessionId;
		}

		return trackData;
	});
};

export const registerHandlers = (userData, handlers) => {
	handlers.forEach((handler) => handler(userData));
};

export const debounce = (func, delay) => {
	let blockerId;

	return (args) => {
		clearTimeout(blockerId);
		blockerId = setTimeout(() => func(args), delay);
	};
};

export const throttle = (func, limit) => {
	let isBlocked = false;

	return (args) => {
		if (isBlocked) {
			return;
		}

		func(args);

		isBlocked = true;
		setTimeout(() => {
			isBlocked = false;
		}, limit);
	};
};

const includes = (haystack, needle) => {
	return haystack.indexOf(needle) !== -1;
};

const find = (needle) => {
	return includes(navigator.userAgent.toLocaleLowerCase(), needle);
};

const windows = () => {
	return find('windows');
};

const linux = () => {
	return find('linux');
};

const iphone = () => {
	return !windows() && find('iphone');
};

const ipod = () => {
	return find('ipod');
};

const ipad = () => {
	const iPadOS13Up = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
	return find('ipad') || iPadOS13Up;
};

const ios = () => {
	return iphone() || ipod() || ipad();
};

const macos = () => {
	return find('mac');
};

const android = () => {
	return !windows() && find('android');
};

const androidPhone = () => {
	return android() && find('mobile');
};

const androidTablet = () => {
	return android() && !find('mobile');
};

const blackberry = () => {
	return find('blackberry') || find('bb10');
};

const blackberryPhone = () => {
	return blackberry() && !find('tablet');
};

const blackberryTablet = () => {
	return blackberry() && find('tablet');
};

const windowsPhone = () => {
	return windows() && find('phone');
};

const windowsTablet = () => {
	return windows() && find('touch') && !windowsPhone();
};

const fxos = () => {
	return (find('(mobile') || find('(tablet')) && find(' rv:');
};

const fxosPhone = () => {
	return fxos() && find('mobile');
};

const fxosTablet = () => {
	return fxos() && find('tablet');
};

const meego = () => {
	return find('meego');
};

const mobile = () => {
	return (
		androidPhone() ||
		iphone() ||
		ipod() ||
		windowsPhone() ||
		blackberryPhone() ||
		fxosPhone() ||
		meego()
	);
};

const tablet = () => {
	return ipad() || androidTablet() || blackberryTablet() || windowsTablet() || fxosTablet();
};

const desktop = () => {
	return !tablet() && !mobile();
};

export const getDeviceType = () => {
	if (desktop()) {
		return 'desktop';
	}

	if (tablet()) {
		return 'tablet';
	}

	if (mobile()) {
		return 'mobile';
	}

	return 'unknown';
};

export const getOS = () => {
	if (ios()) {
		return 'ios';
	}

	if (android()) {
		return 'android';
	}

	if (blackberry()) {
		return 'blackberry';
	}

	if (macos()) {
		return 'macos';
	}

	if (windows()) {
		return 'windows';
	}

	if (linux()) {
		return 'linux';
	}

	if (fxos()) {
		return 'fxos';
	}

	if (meego()) {
		return 'meego';
	}

	return 'unknown';
};

export const getBrowserName = () => {
	if (navigator.userAgent.indexOf('Edge') > -1 && navigator.appVersion.indexOf('Edge') > -1) {
		return 'Edge';
	}

	if (navigator.userAgent.indexOf('Opera') !== -1 || navigator.userAgent.indexOf('OPR') !== -1) {
		return 'Opera';
	}

	if (navigator.userAgent.indexOf('Chrome') !== -1) {
		return 'Chrome';
	}

	if (navigator.userAgent.indexOf('Safari') !== -1) {
		return 'Safari';
	}

	if (navigator.userAgent.indexOf('Firefox') !== -1) {
		return 'Firefox';
	}

	if (navigator.userAgent.indexOf('MSIE') !== -1 || !!document.documentMode === true) {
		// IF IE > 10{
		return 'IE';
	}

	return 'unknown';
};

export const getConnectionType = () => {
	const connectionType = navigator && navigator.connection && navigator.connection.type; // https://developer.mozilla.org/en-US/docs/Web/API/Network_Information_API

	return connectionType;
};
