function saveSelection() {
	if (window.getSelection) {
		let sel = window.getSelection();
		if (sel.getRangeAt && sel.rangeCount) {
			var ranges = [];
			for (var i = 0, len = sel.rangeCount; i < len; ++i) {
				ranges.push(sel.getRangeAt(i));
			}
			return ranges;
		}
	} else if (document.selection && document.selection.createRange) {
		return document.selection.createRange();
	}
	return null;
}

function restoreSelection(savedSel) {
	if (savedSel) {
		if (window.getSelection) {
			let sel = window.getSelection();
			sel.removeAllRanges();
			for (var i = 0, len = savedSel.length; i < len; ++i) {
				sel.addRange(savedSel[i]);
			}
		} else if (document.selection && savedSel.select) {
			savedSel.select();
		}
	}
}

function createLink(url) {
	// There's actually no need to save and restore the selection here. This is just an example.
	var savedSel = saveSelection();

	restoreSelection(savedSel);

	document.execCommand('CreateLink', false, url);
}

export default (node) => {
	node.addEventListener('paste', function (e) {
		e.preventDefault();

		let text = e.clipboardData.getData('text/plain');

		if (text.startsWith('http')) {
			createLink(text);
		} else {
			document.execCommand('insertText', false, text);
		}
	});
};
