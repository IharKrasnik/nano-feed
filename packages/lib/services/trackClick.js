export default ({
	pageId,
	sectionId,
	sectionItemId = null,
	isFeedItem,
	linkId,
	url = null,
	text
}) => {
	try {
		return window.mwave.sendTrackEvent({
			type: 'click_custom',
			payload: {
				fromUrl: window.location.href,
				pageId,
				sectionId,
				sectionItemId,
				linkId,
				url,
				text,
				isFeedItem
			}
		});
	} catch (err) {}
};
