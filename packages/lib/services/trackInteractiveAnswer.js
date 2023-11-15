export default ({ sectionId, sectionItemId = null, emoji, text, value }) => {
	return window.mwave.sendTrackEvent({
		type: 'interactive_answer',
		payload: {
			sectionId,
			sectionItemId,
			emoji,
			text,
			value
		}
	});
};
