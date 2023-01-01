export default (node) => {
	node.onpaste = function (event) {
		var items = (event.clipboardData || event.originalEvent.clipboardData).items;
		console.log(JSON.stringify(items)); // will give you the mime types

		Object.keys(items).forEach((key) => {
			let item = items[key];
			if (item.kind === 'file') {
				var blob = item.getAsFile();
				var reader = new FileReader();
				reader.onload = function (event) {
					console.log(event.target.result);
				}; // data url!
				reader.readAsDataURL(blob);
			}
		});
	};
};
