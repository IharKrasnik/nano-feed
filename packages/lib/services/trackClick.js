export default ({ sectionId, sectionItemId = null, isFeedItem, linkId, url = null, text }) => {
	return window.mwave.sendTrackEvent({
		type: 'click_custom',
		payload: {
			fromUrl: window.location.href,
			sectionId,
			sectionItemId,
			linkId,
			url,
			text,
			isFeedItem
		}
	});
};
