export default ({ sectionId, text }) => {
	try {
		return window.mwave.sendTrackEvent({
			type: 'form_submitted',
			payload: {
				sectionId,
				text
			}
		});
	} catch (err) {}
};
