import { get, writable } from 'svelte/store';

const heatmapStore = writable(null);

export default heatmapStore;

export let getHeatmapClicksCount = ({ sectionId, sectionItemId, linkId }) => {
	let heatmaps = get(heatmapStore);

	return (
		heatmaps.find((h) => {
			if (sectionItemId) {
				return h.sectionItemId === sectionItemId && (!linkId || h.linkId === linkId);
			} else {
				return h.sectionId === sectionId && (!linkId || h.linkId === linkId);
			}
		})?.clickCount || 0
	);
};
