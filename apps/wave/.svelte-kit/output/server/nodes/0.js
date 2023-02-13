import * as universal from '../entries/pages/_layout.js';
import * as server from '../entries/pages/_layout.server.js';

export const index = 0;
export const component = async () => (await import('../entries/pages/_layout.svelte.js')).default;
export const file = '_app/immutable/components/pages/_layout.svelte-cb5ada9e.js';
export { universal };
export { server };
export const imports = ["_app/immutable/components/pages/_layout.svelte-cb5ada9e.js","_app/immutable/chunks/index-a8d98783.js","_app/immutable/chunks/stores-4ada80b1.js","_app/immutable/chunks/singletons-4a3c4a54.js","_app/immutable/chunks/allProjects-2a86290f.js","_app/immutable/chunks/currentUser-50513477.js","_app/immutable/chunks/index-ae66feaa.js","_app/immutable/modules/pages/_layout.js-f791ad68.js","_app/immutable/chunks/_layout-eb6bab1b.js","_app/immutable/chunks/currentUser-50513477.js","_app/immutable/chunks/index-a8d98783.js","_app/immutable/chunks/control-942a5f95.js"];
export const stylesheets = ["_app/immutable/assets/_layout-3d12c259.css"];
export const fonts = [];
