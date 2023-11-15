export default ({ sectionId }) => {
	return window.mwave.sendTrackEvent({
		type: 'form_submitted',
		payload: {
			sectionId
		}
	});
};
