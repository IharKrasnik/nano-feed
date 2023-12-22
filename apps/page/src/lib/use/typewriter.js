import _ from 'lodash';
import Typed from 'typed.js';

// let animate = (bChild) => {
// 	let initialHtml = bChild.innerHTML;

// 	bChild.innerHTML = '&nbsp;';
// 	let index = 0;

// 	let interval = setInterval(() => {
// 		bChild.innerHTML = _.take(initialHtml, index).join('');
// 		index++;

// 		if (index > initialHtml.length) {
// 			let setInterval(() => {

// 			})
// 			clearInterval(interval);
// 		}
// 	}, 100);
// };

export default function typewriter(node, isAnimated = true) {
	if (isAnimated) {
		let bTags = node.getElementsByTagName('b');
		if (bTags.length) {
			Array.prototype.slice.call(bTags).forEach((bChild) => {
				let innerHTML = bChild.innerHTML;
				bChild.innerHTML = '';

				new Typed(bChild, {
					strings: innerHTML.split(',').map((s) => _.trim(s)),
					typeSpeed: 80,
					backDelay: 2000
					// loop: true
				});
			});
		}
	}
}
