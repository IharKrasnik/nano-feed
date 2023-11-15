export default ({ sectionId, text }) => {
	return window.mwave.sendTrackEvent({
		type: 'form_submitted',
		payload: {
			sectionId,
			text
		}
	});
};
