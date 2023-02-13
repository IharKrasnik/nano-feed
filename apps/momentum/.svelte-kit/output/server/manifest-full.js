export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["igor-favicon.png","nano.png","paralect-logo.png","robots.txt"]),
	mimeTypes: {".png":"image/png",".txt":"text/plain"},
	_: {
		entry: null,
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js'),
			() => import('./nodes/2.js'),
			() => import('./nodes/3.js'),
			() => import('./nodes/4.js'),
			() => import('./nodes/5.js'),
			() => import('./nodes/6.js'),
			() => import('./nodes/7.js'),
			() => import('./nodes/8.js'),
			() => import('./nodes/9.js'),
			() => import('./nodes/10.js'),
			() => import('./nodes/11.js')
		],
		routes: [
			{
				id: "/creators",
				pattern: /^\/creators\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 5 },
				endpoint: null
			},
			{
				id: "/[[username]]/edit",
				pattern: /^(?:\/([^/]+))?\/edit\/?$/,
				params: [{"name":"username","optional":true,"rest":false,"chained":true}],
				page: { layouts: [0], errors: [1], leaf: 3 },
				endpoint: null
			},
			{
				id: "/embed-live",
				pattern: /^\/embed-live\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 6 },
				endpoint: null
			},
			{
				id: "/[[username]]/embed",
				pattern: /^(?:\/([^/]+))?\/embed\/?$/,
				params: [{"name":"username","optional":true,"rest":false,"chained":true}],
				page: { layouts: [0], errors: [1], leaf: 4 },
				endpoint: null
			},
			{
				id: "/feed/[feedItemId]",
				pattern: /^\/feed\/([^/]+?)\/?$/,
				params: [{"name":"feedItemId","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0], errors: [1], leaf: 7 },
				endpoint: null
			},
			{
				id: "/launch",
				pattern: /^\/launch\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 8 },
				endpoint: null
			},
			{
				id: "/og.png",
				pattern: /^\/og\.png\/?$/,
				params: [],
				page: null,
				endpoint: () => import('./entries/endpoints/og.png/_server.js')
			},
			{
				id: "/og",
				pattern: /^\/og\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 9 },
				endpoint: null
			},
			{
				id: "/write-editor",
				pattern: /^\/write-editor\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 11 },
				endpoint: null
			},
			{
				id: "/write",
				pattern: /^\/write\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 10 },
				endpoint: null
			},
			{
				id: "/[[username]]",
				pattern: /^(?:\/([^/]+))?\/?$/,
				params: [{"name":"username","optional":true,"rest":false,"chained":true}],
				page: { layouts: [0], errors: [1], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
