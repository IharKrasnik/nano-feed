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
			style: ({
				from = 'rgba(225, 174, 255, 0.3)',
				to = page.theme?.backgroundColor || '#030303'
			}) =>
				`background-image: linear-gradient(to top, ${to}, rgba(0, 0, 0, 0)),linear-gradient(104deg, ${hexToRgbA(
					from,
					0.2
				)}, rgba(0, 108, 104, 0.3) 42%, ${to});`
		},
		coma: { className: '', gradient: '' },
		turborepo: {
			className: 'opacity-20 rounded-full',
			style: ({ from = '#2a8af6', to = '#a853ba' }) =>
				`background-image: conic-gradient(from 180deg at 50% 50%,#2a8af6 0deg,${from} 180deg,${to} 1turn); filter: blur(75px); will-change: filter;`
		},
		cobalt: {
			style: ({ from = 'rgba(94,176,239,.5)' }) =>
				`background-image: radial-gradient(70% 50% at 50% -10%,${hexToRgbA(
					from,
					0.2
				)},hsla(0,0%,100%,0));`
		}
	};
</script>

{#if gradientType === 'ray'}
	<div
		class="absolute inset-x-0 top-0 flex items-start justify-center h-screen w-full overflow-hidden blur-3xl"
	>
		<svg
			viewBox="0 0 6039 6264"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			class="opacity-20 max-h-[60%] mt-[-100px]"
		>
			<path
				d="M3866.32 4124.5L5487.32 5048L6038.32 4780.5L5324.82 4287.5L0.815676 0L2367.32 3119.5L3995.82 6263.5H4619.82L3866.32 4124.5Z"
				fill={page.theme.accentColor}
			/>
		</svg>
		<!-- <div
			class="aspect-[1108/632] w-[69.25rem] flex-none bg-gradient-to-r opacity-20"
			style="clip-path:polygon(77.5% 40.13%, 90% 10%, 100% 50%, 95% 80%, 92% 85%, 75% 65%, 61.26% 54.7%, 50% 54.7%, 47.24% 65.81%, 50% 85%, 26.16% 73.91%, 0.1% 100%, 1% 40.13%, 20% 48.75%, 60% 0.25%, 67.5% 32.63%);
			--tw-gradient-from: {page.theme.accentColor}; --tw-gradient-to: {page.theme
				.accentColor}; --tw-gradient-stops: var(--tw-gradient-from),var(--tw-gradient-to);"
		/> -->
	</div>
{:else if types[gradientType].style}
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
