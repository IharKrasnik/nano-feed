import { sendTrackData } from '../helpers';

const removeTags = (node, tagName) => {
	const nodeCloned = node.cloneNode(true);
	const tags = nodeCloned.getElementsByTagName(tagName);

	while (tags.length) {
		tags[0].parentNode.removeChild(tags[0]);
	}

	return nodeCloned;
};

export const removeDangerousTags = (node) => {
	const rootWithoutScripts = removeTags(node, 'script');
	const rootWithoutIframes = removeTags(rootWithoutScripts, 'iframe');
	return rootWithoutIframes;
};

let prevWidth;
let prevHeight;

const handleMutation = (userData) => {
	const root = document.getElementsByTagName('html')[0];
	if (!root) {
		return;
	}

	[...root.querySelectorAll('input')].forEach((el) => {
		if (!el.getAttribute('value') && el.value) {
			el.setAttribute('value', el.value);
		}
	});

	const rootWithoutDangerousTags = removeDangerousTags(root);
	const screen = rootWithoutDangerousTags.outerHTML;

	const width = root.offsetWidth;
	const height = root.offsetHeight;

	if (prevWidth !== width && prevHeight !== height) {
		sendTrackData(userData, 'waveRecords', {
			timestamp: Date.now(),
			payload: {
				size: {
					width,
					height
				},
				screen
			}
		});

		prevWidth = width;
		prevHeight = height;
	}
};

export default handleMutation;
