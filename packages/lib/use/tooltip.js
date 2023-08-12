import Tooltip from 'lib/components/Tooltip.svelte';

export default function tooltip(element) {
	let div;
	let title;
	let tooltipComponent;

	function mouseOver(event) {
		// NOTE: remove the `title` attribute, to prevent showing the default browser tooltip
		// remember to set it back on `mouseleave`
		title = element.getAttribute('title');

		if (!tooltipComponent) {
			tooltipComponent = new Tooltip({
				props: {
					title: title,
					x: event.pageX,
					y: event.pageY
				},
				target: document.body
			});
		}
	}

	function mouseMove(event) {
		tooltipComponent.$set({
			x: event.pageX,
			y: event.pageY
		});
	}

	function mouseLeave() {
		if (tooltipComponent) {
			tooltipComponent.$destroy();
			tooltipComponent = null;
		}
	}

	element.addEventListener('mouseover', mouseOver);
	element.addEventListener('mouseleave', mouseLeave);
	element.addEventListener('mousemove', mouseMove);

	return {
		destroy() {
			mouseLeave();
			element.removeEventListener('mouseover', mouseOver);
			element.removeEventListener('mouseleave', mouseLeave);
			element.removeEventListener('mousemove', mouseMove);
		}
	};
}
