import _ from 'lodash';
import { put } from 'lib/api';
import childStreams from 'lib/stores/childStreams';

export default async ({ page, streamType }) => {
	let parentPage = page.parentPage || page;

	if (!parentPage.streams || !parentPage.streams[streamType]) {
		const { stream } = await put(`pages/${parentPage._id}/embed-stream`, {
			title: _.capitalize(streamType),
			streamType
		});

		childStreams.update((streams) => {
			if (!streams.find((s) => s._id === stream._id)) {
				return [stream, ...streams];
			}

			return streams;
		});

		parentPage.streams = parentPage.streams || {};
		parentPage.streams[streamType] = stream;
	}

	return parentPage.streams[streamType].slug;
};
