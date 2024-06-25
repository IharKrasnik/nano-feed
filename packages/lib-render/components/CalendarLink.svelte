<script>
	import { v4 as uuidv4 } from 'uuid';
	import { onMount } from 'svelte';

	export let url;

	let embedId = uuidv4();

	(function (C, A, L) {
		let p = function (a, ar) {
			a.q.push(ar);
		};
		let d = C.document;
		C.Cal =
			C.Cal ||
			function () {
				let cal = C.Cal;
				let ar = arguments;
				if (!cal.loaded) {
					cal.ns = {};
					cal.q = cal.q || [];
					d.head.appendChild(d.createElement('script')).src = A;
					cal.loaded = true;
				}
				if (ar[0] === L) {
					const api = function () {
						p(api, arguments);
					};
					const namespace = ar[1];
					api.q = api.q || [];
					if (typeof namespace === 'string') {
						cal.ns[namespace] = cal.ns[namespace] || api;
						p(cal.ns[namespace], ar);
						p(cal, ['initNamespace', namespace]);
					} else p(cal, ar);
					return;
				}
				p(cal, ar);
			};
	})(window, 'https://app.cal.com/embed/embed.js', 'init');
	Cal('init', { origin: 'https://cal.com' });

	let embedEl;

	onMount(() => {
		if (url.includes('cal.com')) {
			Cal('inline', {
				elementOrSelector: embedEl,
				calLink: url.replace('https://cal.com/', ''),
				layout: 'month_view'
			});

			Cal('ui', {
				styles: { branding: { brandColor: '#000000' } },
				hideEventTypeDetails: false,
				layout: 'month_view'
			});
		}
	});
</script>

<div style="width:100%;height:100%;overflow:scroll" bind:this={embedEl} id={embedId} />
