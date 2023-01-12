let state = {};

export default function portal(node, selector = 'body') {
	state[selector] = state[selector] || {};

	// Store this portals children
	state[selector].portalChildren = node.children;

	// Find where the portal should go
	state[selector].targetNode = document.querySelector(selector);

	// Backup the children of what the portal will replace
	// state[selector].targetNodeChildren = [...state[selector].targetNode.children];

	// Replace the original contents of the targetNode with the portal
	// state[selector].targetNode.innerHTML = '';

	state[selector].targetNode.append(...state[selector].portalChildren);

	// On destroy swap back original target
	return {
		destroy() {
			// state[selector].targetNode.innerHTML = '';
			const children = [...state[selector].targetNode.children];
			children.pop();
			state[selector].targetNode.replaceChildren(...children);
		}
	};
}
