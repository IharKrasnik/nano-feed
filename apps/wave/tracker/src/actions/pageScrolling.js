import { sendTrackData, throttle } from '../helpers';

const SCROLL_THROTTLE_TIME = 100;

export default (userData) => {
	// window.addEventListener(
	// 	'scroll',
	// 	throttle(
	// 		() =>
	// 			sendTrackData(userData, 'waveActions', {
	// 				type: 'pageScroll',
	// 				timestamp: Date.now(),
	// 				payload: {
	// 					offset: {
	// 						x: window.pageXOffset,
	// 						y: window.pageYOffset
	// 					}
	// 				}
	// 			}),
	// 		SCROLL_THROTTLE_TIME
	// 	)
	// );
};
