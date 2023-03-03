import { sendTrackData, getCssPath, getValue } from '../helpers';

export default (userData) => {
	// const handleClick = (event) => {
	// 	const data = {
	// 		type: 'click',
	// 		timestamp: Date.now(),
	// 		payload: {
	// 			position: {
	// 				x: event.clientX,
	// 				y: event.clientY
	// 			},
	// 			selector: getCssPath(event.target),
	// 			value: getValue(event.target)
	// 		}
	// 	};
	// 	// corrects clicls after scrolling
	// 	sendTrackData(userData, 'waveActions', {
	// 		type: 'pageScroll',
	// 		timestamp: Date.now(),
	// 		payload: {
	// 			offset: {
	// 				x: window.pageXOffset,
	// 				y: window.pageYOffset
	// 			}
	// 		}
	// 	});
	// 	sendTrackData(userData, 'waveActions', data);
	// };
	// return window.addEventListener('click', handleClick, { capture: true, passive: true });
};

// clicks doesn't work on disabled elements.
// https://www.w3.org/TR/2014/REC-html5-20141028/forms.html#concept-fe-disabled
