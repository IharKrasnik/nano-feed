import { sendTrackData, debounce, DEFAULT_DEBOUNCE_TIME } from '../helpers';

export default (userData) => {
	// window.addEventListener(
	// 	'resize',
	// 	debounce(
	// 		() =>
	// 			sendTrackData(userData, 'waveActions', {
	// 				type: 'resize',
	// 				timestamp: Date.now(),
	// 				payload: {
	// 					size: {
	// 						width: window.innerWidth,
	// 						height: window.innerHeight
	// 					}
	// 				}
	// 			}),
	// 		DEFAULT_DEBOUNCE_TIME
	// 	)
	// );
};
