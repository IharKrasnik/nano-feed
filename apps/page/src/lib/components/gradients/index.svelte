<script>
	export let gradientType;
	export let page;

	let turborepo = ['#2a8af6', 'a853ba'];

	function hexToRgbA(hex, opacity = 1) {
		var c;
		if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
			c = hex.substring(1).split('');
			if (c.length == 3) {
				c = [c[0], c[0], c[1], c[1], c[2], c[2]];
			}
			c = '0x' + c.join('');
			return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + `,${opacity})`;
		}
		throw new Error('Bad Hex');
	}

	let types = {
		ship: {
			className: '',
			style: ({ from = 'rgba(225, 174, 255, 0.3)' }) =>
				`background-image: linear-gradient(to top, #030303, rgba(0, 0, 0, 0)),linear-gradient(104deg, ${hexToRgbA(
					from,
					0.2
				)}, rgba(0, 108, 104, 0.3) 42%, #030303);`
		},
		coma: { className: '', gradient: '' },
		turborepo: {
			className: 'opacity-20 rounded-full',
			style: ({ from = '#2a8af6', to = '#a853ba' }) =>
				`background-image: conic-gradient(from 180deg at 50% 50%,#2a8af6 0deg,${from} 180deg,${to} 1turn); filter: blur(75px); will-change: filter;`
		}
	};
</script>

{#if types[gradientType].style}
	<div
		class="absolute top-0 left-0 z-0 w-full h-screen {types[gradientType].className}"
		style="{types[gradientType].style({ from: page.theme.accentColor })}; z-index: 2;"
	/>
{:else if types[gradientType].url}
	<img
		src="https://assets.website-files.com/64a2db27e840da3808f8f72a/64a2f21c5531b36cb386eaf0_Hero%20BG%20Compressed.png"
		loading="lazy"
		alt=""
		sizes="(max-width: 991px) 100vw, 96vw"
		srcset="https://assets.website-files.com/64a2db27e840da3808f8f72a/64a2f21c5531b36cb386eaf0_Hero%20BG%20Compressed-p-500.png 500w, https://assets.website-files.com/64a2db27e840da3808f8f72a/64a2f21c5531b36cb386eaf0_Hero%20BG%20Compressed-p-800.png 800w, https://assets.website-files.com/64a2db27e840da3808f8f72a/64a2f21c5531b36cb386eaf0_Hero%20BG%20Compressed-p-1080.png 1080w, https://assets.website-files.com/64a2db27e840da3808f8f72a/64a2f21c5531b36cb386eaf0_Hero%20BG%20Compressed.png 1951w"
	/>;
{/if}

<!-- SENJA
radial-gradient(circle at 50% 0%, rgba(255, 152, 0, 0.4) 0%, transparent 100%) -->
