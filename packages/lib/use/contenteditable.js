import isShowContentEditableMenu from 'lib/stores/isShowContentEditableMenu';
import clickOutside from 'lib/stores/isShowContentEditableMenu';

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

let savedSelection;

function restoreSelection() {
	if (window.getSelection) {
		let sel = window.getSelection();
		sel.removeAllRanges();
		for (var i = 0, len = savedSelection.length; i < len; ++i) {
			sel.addRange(savedSelection[i]);
		}
	} else if (document.selection && savedSelection.select) {
		savedSelection.select();
	}
}

function createLink(url) {
	// var savedSel = saveSelection();
	// restoreSelection(savedSel);

	document.execCommand('CreateLink', false, url);
}

export default (node, { isWithMenu = false } = {}) => {
	node.addEventListener('paste', function (e) {
		e.preventDefault();

		let text = e.clipboardData.getData('text/plain');

		if (text.startsWith('http')) {
			createLink(text);
		} else {
			document.execCommand('insertText', false, text);
		}
	});

	if (isWithMenu) {
		let control;
		control = document.getElementById('content-editable-menu');

		if (!control.getAttribute('data-configured')) {
			control.addEventListener('format', ({ detail }) => {
				restoreSelection(savedSelection);

				let { type } = detail;

				if (type === 'h3' || type === 'h2' || type === 'h1') {
					document.execCommand(
						'insertHTML',
						false,
						`<${type} class="test">${window.getSelection()}</${type}>`
					);
				} else if (type === 'regular') {
					let selection = window.getSelection();
					debugger;
					selection.anchorNode.parentNode.replaceWith(selection.anchorNode);
					// document.execCommand('formatBlock', false, 'span');
					// document.execCommand('insertText', false, window.getSelection());
				}

				isShowContentEditableMenu.set(false);
			});

			control.setAttribute('data-configured', true);
		}

		node.onpointerup = () => {
			let selection = document.getSelection(),
				text = selection.toString();

			if (text !== '') {
				let rect = selection.getRangeAt(0).getBoundingClientRect();
				control.style.top = `calc(${rect.top}px + 30px)`;
				control.style.left = `calc(${rect.left}px + calc(${rect.width}px / 2) - 40px)`;
				control.text = text;

				savedSelection = saveSelection();

				setTimeout(() => {
					isShowContentEditableMenu.set(true);
				});
			}
		};

		document.onpointerdown = () => {
			let control = document.querySelector('#control');
			if (control !== null) {
				control.remove();
				document.getSelection().removeAllRanges();
			}
		};
	}
};
