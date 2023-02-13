export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["igor-favicon.png","nano.png","paralect-logo.png","robots.txt","wave.js"]),
	mimeTypes: {".png":"image/png",".txt":"text/plain",".js":"application/javascript"},
	_: {
		entry: {"file":"_app/immutable/start-4d23ca2b.js","imports":["_app/immutable/start-4d23ca2b.js","_app/immutable/chunks/index-a8d98783.js","_app/immutable/chunks/singletons-4a3c4a54.js","_app/immutable/chunks/control-942a5f95.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js'),
			() => import('./nodes/2.js'),
			() => import('./nodes/3.js'),
			() => import('./nodes/4.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 2 },
				endpoint: null
			},
			{
				id: "/new",
				pattern: /^\/new\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 3 },
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
				id: "/projects/[slug]",
				pattern: /^\/projects\/([^/]+?)\/?$/,
				params: [{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0], errors: [1], leaf: 4 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
