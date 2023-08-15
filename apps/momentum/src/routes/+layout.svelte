<script>
	// export const prerender = false;

	import 'lib/app.css';
	import '../app.css';

	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { onDestroy } from 'svelte';

	import Dock from 'lib/components/Dock.svelte';
	import Invest from '$lib/components/Invest.svelte';
	import allProjects from '$lib/stores/allProjects';

	import { SvelteToast } from '@zerodevx/svelte-toast';

	import {
		connect as connectSocketIo,
		disconnect as disconnectSocketIo
	} from 'lib/socketIoService';

	let isBurgerOpen = false;

	const toggleBurger = () => {
		isBurgerOpen = !isBurgerOpen;
	};

	if (!$page.url.href.includes('/embed')) {
		if (browser) {
			connectSocketIo();

			onDestroy(() => {
				disconnectSocketIo();
			});
		}
	}

	let isNanoRoute = () => {
		return (
			$page.url.href.includes('/invest') ||
			$page.url.href.includes('/grow') ||
			($page.url.href.includes('nanohq.co') &&
				$page.url.pathname === '/' &&
				!$page.url.searchParams.get('stream'))
		);
	};

	import 'lazysizes';
	// import a plugin
	import 'lazysizes/plugins/parent-fit/ls.parent-fit';
</script>

<svelte:head>
	{#if isNanoRoute()}
		<title>Nano Fund</title>
		<style>
			body {
				background-color: #2d3436;
				background-image: linear-gradient(315deg, #000000 0%, #111 74%);
			}
		</style>

		<meta name="title" content="Nano Fund" />
		<meta name="description" content="Invest in authentic open early-stage startups" />
		<meta name="og:description" content="Invest in authentic open early-stage startups" />
		<meta
			name="og:image"
			content="https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1683893482903-nano_banner.png"
		/>
	{:else}
		<title>{$page.data.ogTitle}</title>
		<meta name="title" content={$page.data.ogTitle} />
		<meta name="description" content={$page.data.ogDescription} />
		<meta name="og:description" content={$page.data.ogDescription} />

		<meta
			name="og:image"
			content={$page.data.ogImage ||
				($page.params.username &&
					`https://feed.mmnntm.build/og.png?streamName=${$page.params.username}`) ||
				'https://assets.website-files.com/636cf54cf20a6ac090f7deb0/63773738962ed74d59268fbc_open-graph.png'}
		/>
	{/if}

	<!-- <script src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>  -->
	<!-- <script src="https://www.tiktok.com/embed.js"></script> -->

	{#if !$page.url.href.includes('/embed')}
		<script async src="https://wave.mmntm.build/wave.js"></script>

		<script>
			!(function (t, e) {
				var o, n, p, r;
				e.__SV ||
					((window.posthog = e),
					(e._i = []),
					(e.init = function (i, s, a) {
						function g(t, e) {
							var o = e.split('.');
							2 == o.length && ((t = t[o[0]]), (e = o[1])),
								(t[e] = function () {
									t.push([e].concat(Array.prototype.slice.call(arguments, 0)));
								});
						}
						((p = t.createElement('script')).type = 'text/javascript'),
							(p.async = !0),
							(p.src = s.api_host + '/static/array.js'),
							(r = t.getElementsByTagName('script')[0]).parentNode.insertBefore(p, r);
						var u = e;
						for (
							void 0 !== a ? (u = e[a] = []) : (a = 'posthog'),
								u.people = u.people || [],
								u.toString = function (t) {
									var e = 'posthog';
									return 'posthog' !== a && (e += '.' + a), t || (e += ' (stub)'), e;
								},
								u.people.toString = function () {
									return u.toString(1) + '.people (stub)';
								},
								o =
									'capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys'.split(
										' '
									),
								n = 0;
							n < o.length;
							n++
						)
							g(u, o[n]);
						e._i.push([i, s, a]);
					}),
					(e.__SV = 1));
			})(document, window.posthog || []);
			posthog.init('phc_xHNFTv28lnKvPUGflju5TCNEEQufo2YKjrmQG2RNrau', {
				api_host: 'https://app.posthog.com'
			});
		</script>

		<style>
			body {
				background: black;
			}
		</style>
	{/if}

	{#if $page.url.href.includes('/embed-indie')}
		<style>
			body {
				background: #111;
			}

			body main {
				max-width: 1000px;
				margin: 0 auto;
			}
		</style>
	{/if}
</svelte:head>

<div id="modal-portal" />

<div
	class="app overflow-y-auto"
	class:bg-black={!$page.url.href.includes('embed') && !$page.url.href.includes('invest')}
	class:_gradient={$page.url.href.toLowerCase().includes('bachrimchuk')}
>
	{#if !$page.url.href.includes('/embed') && !isNanoRoute()}
		<div class="container xl:mx-auto px-8 xl:px-0 max-w-[600px]">
			<div
				class="
		fixed xl:ml-[-290px] px-8 py-4 sm:px-0 sm:py-8 top-0 left-0 sm:left-auto w-full  mb-8 bg-black
		{$page.url.href.includes('/feed/') || $page.url.href.includes('/write-editor')
					? ''
					: 'xl:w-[300px]'}
		"
				style="opacity: .95;
						z-index: 1111;"
			>
				<a href="/" class="mb-8">
					<h1 class="flex justify-between items-center text-xl font-bold" style="z-index: 100;">
						<svg
							style="width: 150px; height: 30px; margin-left: -15px;"
							width="659"
							height="155"
							viewBox="0 0 659 155"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M5.1804 18.2637C0 27.0232 0 38.8475 0 62.496V92.504C0 116.153 0 127.977 5.1804 136.736C8.37002 142.13 12.8703 146.63 18.2637 149.82C27.0232 155 38.8475 155 62.496 155H92.504C116.153 155 127.977 155 136.736 149.82C142.13 146.63 146.63 142.13 149.82 136.736C155 127.977 155 116.152 155 92.504V62.496C155 38.8475 155 27.0232 149.82 18.2637C146.63 12.8703 142.13 8.37002 136.736 5.1804C127.977 0 116.152 0 92.504 0H62.496C38.8475 0 27.0232 0 18.2637 5.1804C12.8703 8.37002 8.37002 12.8703 5.1804 18.2637ZM104.35 66.9178C104.664 67.1502 104.664 68.1594 104.664 70.1779V103.864C104.664 104.849 104.664 105.342 104.88 105.707C105.013 105.931 105.2 106.119 105.425 106.252C105.79 106.468 106.282 106.468 107.268 106.468H130.756C131.742 106.468 132.234 106.468 132.599 106.252C132.824 106.119 133.011 105.931 133.144 105.707C133.36 105.342 133.36 104.849 133.36 103.864V52.7037C133.36 51.7184 133.36 51.2257 133.144 50.8607C133.011 50.636 132.824 50.4485 132.599 50.3156C132.234 50.0997 131.742 50.0997 130.756 50.0997H107.268C106.282 50.0997 105.79 50.0997 105.425 50.3156C105.2 50.4485 105.013 50.636 104.88 50.8607C104.664 51.2257 104.664 51.7184 104.664 52.7037V54.0327C104.664 55.4348 104.664 56.1358 104.333 56.5572C104.131 56.8138 103.854 57.0004 103.54 57.0902C103.025 57.2376 102.376 56.9732 101.078 56.4444L82.858 49.0245C81.9519 48.6555 81.4988 48.471 81.0813 48.5318C80.8243 48.5693 80.5808 48.6707 80.3731 48.8269C80.036 49.0804 79.848 49.5321 79.4719 50.4354L73.7409 64.2009C73.2197 65.4527 72.9592 66.0785 72.5041 66.3408C72.2266 66.5007 71.9063 66.5708 71.5874 66.5413C71.0644 66.4929 70.5663 66.033 69.5702 65.1131L54.1061 50.8319C53.3858 50.1667 53.0256 49.8341 52.6127 49.7446C52.3584 49.6895 52.0944 49.6993 51.8449 49.773C51.4398 49.8928 51.1052 50.2511 50.4361 50.9678L17.2868 86.4721C16.611 87.1959 16.2731 87.5578 16.1823 87.9735C16.1263 88.2295 16.1362 88.4955 16.2109 88.7466C16.3323 89.1545 16.696 89.4904 17.4235 90.1622L34.2867 105.735C35.007 106.401 35.3672 106.733 35.7801 106.823C36.0343 106.878 36.2984 106.868 36.5478 106.794C36.953 106.674 37.2876 106.316 37.9567 105.599L66.502 75.0262C68.0131 73.4077 68.7687 72.5985 69.1625 72.6489C69.3947 72.6786 69.6011 72.8116 69.7239 73.0109C69.9323 73.3489 69.5067 74.371 68.6557 76.4151L61.603 93.3552C61.2216 94.2713 61.0309 94.7294 61.0913 95.1513C61.1285 95.411 61.231 95.6571 61.3893 95.8664C61.6463 96.2064 62.1058 96.3935 63.0248 96.7678L84.4499 105.493C85.356 105.862 85.8091 106.047 86.2266 105.986C86.4836 105.948 86.7272 105.847 86.9348 105.691C87.2719 105.437 87.4599 104.986 87.836 104.082L102.16 69.6774C102.936 67.814 103.323 66.8823 103.703 66.7885C103.927 66.7332 104.164 66.7805 104.35 66.9178Z"
								fill="white"
							/>
							<path
								d="M199.286 102.538V56.2664H211.139L212.192 62.8515H212.807C213.861 61.2711 215.119 59.8955 216.582 58.7248C218.104 57.5541 219.773 56.6761 221.587 56.0908C223.402 55.5054 225.333 55.2128 227.382 55.2128C230.543 55.2128 233.235 55.8567 235.46 57.1444C237.684 58.3736 239.382 60.276 240.552 62.8515H241.167C242.22 61.2711 243.479 59.8955 244.942 58.7248C246.464 57.5541 248.132 56.6761 249.947 56.0908C251.82 55.5054 253.752 55.2128 255.742 55.2128C258.961 55.2128 261.683 55.8274 263.907 57.0566C266.132 58.2273 267.829 60.0418 269 62.5003C270.229 64.9002 270.844 67.9732 270.844 71.7194V102.538H256.444V73.9145C256.444 72.6267 256.298 71.5438 256.005 70.6658C255.713 69.7293 255.303 68.9683 254.776 68.383C254.249 67.7391 253.576 67.2708 252.757 66.9781C251.937 66.6855 251.059 66.5391 250.123 66.5391C248.601 66.5391 247.225 66.9489 245.996 67.7684C244.825 68.5293 243.918 69.5829 243.274 70.9292C242.63 72.217 242.308 73.7388 242.308 75.4949V102.538H227.909V73.9145C227.909 72.6267 227.763 71.5438 227.47 70.6658C227.177 69.7293 226.767 68.9683 226.241 68.383C225.714 67.7391 225.041 67.2708 224.221 66.9781C223.402 66.6855 222.524 66.5391 221.587 66.5391C220.065 66.5391 218.69 66.9489 217.461 67.7684C216.29 68.5293 215.353 69.5829 214.651 70.9292C214.007 72.217 213.685 73.7388 213.685 75.4949V102.538H199.286Z"
								fill="white"
							/>
							<path
								d="M299.513 103.591C294.362 103.591 289.942 102.713 286.255 100.957C282.626 99.2012 279.816 96.5379 277.826 92.9673C275.894 89.3382 274.928 84.8018 274.928 79.3581C274.928 73.9144 275.894 69.4073 277.826 65.8367C279.816 62.2661 282.626 59.6028 286.255 57.8468C289.942 56.0908 294.362 55.2128 299.513 55.2128C304.722 55.2128 309.142 56.0908 312.771 57.8468C316.458 59.6028 319.268 62.2661 321.2 65.8367C323.19 69.4073 324.185 73.9144 324.185 79.3581C324.185 84.8018 323.19 89.3382 321.2 92.9673C319.268 96.5379 316.458 99.2012 312.771 100.957C309.142 102.713 304.722 103.591 299.513 103.591ZM299.513 93.1429C301.913 93.1429 303.844 92.6747 305.308 91.7381C306.83 90.8016 307.912 89.4553 308.556 87.6992C309.259 85.8847 309.61 83.6604 309.61 81.0263V77.7777C309.61 75.1437 309.259 72.9194 308.556 71.1048C307.912 69.2902 306.83 67.944 305.308 67.0659C303.844 66.1294 301.913 65.6611 299.513 65.6611C297.171 65.6611 295.24 66.1294 293.718 67.0659C292.255 67.944 291.172 69.2902 290.469 71.1048C289.825 72.9194 289.503 75.1437 289.503 77.7777V81.0263C289.503 83.6604 289.825 85.8847 290.469 87.6992C291.172 89.4553 292.255 90.8016 293.718 91.7381C295.24 92.6747 297.171 93.1429 299.513 93.1429Z"
								fill="white"
							/>
							<path
								d="M328.467 102.538V56.2664H340.32L341.373 62.8515H341.988C343.042 61.2711 344.3 59.8955 345.764 58.7248C347.285 57.5541 348.954 56.6761 350.768 56.0908C352.583 55.5054 354.514 55.2128 356.563 55.2128C359.724 55.2128 362.416 55.8567 364.641 57.1444C366.865 58.3736 368.563 60.276 369.733 62.8515H370.348C371.401 61.2711 372.66 59.8955 374.123 58.7248C375.645 57.5541 377.313 56.6761 379.128 56.0908C381.001 55.5054 382.933 55.2128 384.923 55.2128C388.142 55.2128 390.864 55.8274 393.088 57.0566C395.313 58.2273 397.01 60.0418 398.181 62.5003C399.41 64.9002 400.025 67.9732 400.025 71.7194V102.538H385.625V73.9145C385.625 72.6267 385.479 71.5438 385.186 70.6658C384.894 69.7293 384.484 68.9683 383.957 68.383C383.43 67.7391 382.757 67.2708 381.938 66.9781C381.118 66.6855 380.24 66.5391 379.304 66.5391C377.782 66.5391 376.406 66.9489 375.177 67.7684C374.006 68.5293 373.099 69.5829 372.455 70.9292C371.811 72.217 371.489 73.7388 371.489 75.4949V102.538H357.09V73.9145C357.09 72.6267 356.944 71.5438 356.651 70.6658C356.358 69.7293 355.948 68.9683 355.422 68.383C354.895 67.7391 354.222 67.2708 353.402 66.9781C352.583 66.6855 351.705 66.5391 350.768 66.5391C349.246 66.5391 347.871 66.9489 346.642 67.7684C345.471 68.5293 344.534 69.5829 343.832 70.9292C343.188 72.217 342.866 73.7388 342.866 75.4949V102.538H328.467Z"
								fill="white"
							/>
							<path
								d="M428.957 103.591C423.689 103.591 419.211 102.743 415.524 101.045C411.836 99.289 408.997 96.6257 407.007 93.0551C405.075 89.4845 404.11 84.9189 404.11 79.3581C404.11 73.9144 405.075 69.4073 407.007 65.8367C408.939 62.2661 411.719 59.6028 415.348 57.8468C418.977 56.0908 423.338 55.2128 428.43 55.2128C433.464 55.2128 437.708 56.0615 441.162 57.759C444.674 59.4565 447.337 62.0613 449.152 65.5733C450.966 69.0854 451.873 73.6218 451.873 79.1825V82.2556H418.685C418.685 84.714 419.036 86.792 419.738 88.4895C420.441 90.187 421.523 91.4747 422.987 92.3527C424.45 93.2307 426.411 93.6697 428.869 93.6697C430.333 93.6697 431.621 93.4941 432.733 93.1429C433.845 92.7917 434.781 92.2942 435.542 91.6503C436.303 90.9479 436.889 90.1284 437.298 89.1919C437.708 88.2553 437.913 87.2017 437.913 86.031H451.873C451.873 88.8407 451.347 91.3576 450.293 93.5819C449.298 95.7477 447.805 97.5915 445.815 99.1134C443.825 100.577 441.396 101.689 438.528 102.45C435.718 103.211 432.528 103.591 428.957 103.591ZM418.772 74.2657H437.211C437.211 72.7438 437.006 71.4267 436.596 70.3146C436.245 69.1439 435.689 68.1781 434.928 67.4172C434.225 66.6562 433.347 66.1001 432.294 65.7489C431.299 65.3392 430.128 65.1343 428.782 65.1343C426.674 65.1343 424.918 65.4855 423.514 66.1879C422.109 66.8903 421.026 67.9147 420.265 69.261C419.504 70.6073 419.006 72.2755 418.772 74.2657Z"
								fill="white"
							/>
							<path
								d="M456.276 102.538V56.2664H468.129L469.183 62.8515H469.797C470.968 61.2711 472.314 59.8955 473.836 58.7248C475.358 57.5541 477.085 56.6761 479.016 56.0908C480.948 55.5054 482.997 55.2128 485.162 55.2128C488.499 55.2128 491.308 55.8274 493.591 57.0566C495.933 58.2858 497.718 60.1297 498.947 62.5881C500.176 65.0465 500.791 68.1781 500.791 71.9828V102.538H486.392V74.0022C486.392 72.7145 486.216 71.6316 485.865 70.7536C485.572 69.8171 485.133 69.0268 484.548 68.383C483.962 67.7391 483.231 67.2708 482.353 66.9781C481.475 66.6855 480.48 66.5391 479.368 66.5391C477.67 66.5391 476.177 66.9489 474.89 67.7684C473.602 68.5293 472.578 69.5829 471.817 70.9292C471.056 72.217 470.675 73.7388 470.675 75.4949V102.538H456.276Z"
								fill="white"
							/>
							<path
								d="M523.348 103.591C520.362 103.591 517.816 103.152 515.709 102.274C513.66 101.338 512.109 99.9622 511.056 98.1476C510.06 96.333 509.563 94.138 509.563 91.5625V66.7147H503.505V56.2664H510.002L512.987 42.745H523.875V56.2664H532.918V66.7147H523.875V88.0505C523.875 89.6894 524.196 90.9479 524.84 91.8259C525.484 92.7039 526.655 93.1429 528.352 93.1429H532.918V102.099C532.157 102.333 531.191 102.567 530.021 102.801C528.908 103.094 527.767 103.299 526.596 103.416C525.426 103.533 524.343 103.591 523.348 103.591Z"
								fill="white"
							/>
							<path
								d="M551.863 103.591C546.887 103.591 543.024 102.216 540.273 99.4646C537.58 96.7135 536.234 92.4991 536.234 86.8212V56.2664H550.633V84.8018C550.633 86.031 550.78 87.1139 551.072 88.0505C551.424 88.987 551.892 89.7772 552.477 90.4211C553.063 91.065 553.794 91.5332 554.672 91.8259C555.609 92.1186 556.604 92.2649 557.657 92.2649C559.355 92.2649 560.848 91.8844 562.135 91.1235C563.423 90.304 564.447 89.2211 565.208 87.8749C565.969 86.47 566.35 84.9481 566.35 83.3092V56.2664H580.749V102.538H568.896L568.018 95.9526H567.403C566.35 97.4745 565.003 98.8207 563.365 99.9914C561.784 101.162 559.999 102.04 558.009 102.625C556.077 103.269 554.028 103.591 551.863 103.591Z"
								fill="white"
							/>
							<path
								d="M587.326 102.538V56.2664H599.179L600.233 62.8515H600.847C601.901 61.2711 603.16 59.8955 604.623 58.7248C606.145 57.5541 607.813 56.6761 609.628 56.0908C611.442 55.5054 613.374 55.2128 615.422 55.2128C618.583 55.2128 621.276 55.8567 623.5 57.1444C625.724 58.3736 627.422 60.276 628.593 62.8515H629.207C630.261 61.2711 631.519 59.8955 632.983 58.7248C634.505 57.5541 636.173 56.6761 637.987 56.0908C639.86 55.5054 641.792 55.2128 643.782 55.2128C647.002 55.2128 649.723 55.8274 651.948 57.0566C654.172 58.2273 655.87 60.0418 657.04 62.5003C658.269 64.9002 658.884 67.9732 658.884 71.7194V102.538H644.485V73.9145C644.485 72.6267 644.338 71.5438 644.046 70.6658C643.753 69.7293 643.343 68.9683 642.816 68.383C642.29 67.7391 641.616 67.2708 640.797 66.9781C639.977 66.6855 639.1 66.5391 638.163 66.5391C636.641 66.5391 635.266 66.9489 634.036 67.7684C632.866 68.5293 631.958 69.5829 631.314 70.9292C630.671 72.217 630.349 73.7388 630.349 75.4949V102.538H615.949V73.9145C615.949 72.6267 615.803 71.5438 615.51 70.6658C615.218 69.7293 614.808 68.9683 614.281 68.383C613.754 67.7391 613.081 67.2708 612.262 66.9781C611.442 66.6855 610.564 66.5391 609.628 66.5391C608.106 66.5391 606.73 66.9489 605.501 67.7684C604.33 68.5293 603.394 69.5829 602.691 70.9292C602.047 72.217 601.725 73.7388 601.725 75.4949V102.538H587.326Z"
								fill="white"
							/>
						</svg>
						<!-- <div class="md:hidden">
						<svg on:click="{toggleBurger}" width="40" height="20" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
							{#if isBurgerOpen}
							<path d="M1 1L13 13M1 13L13 1" stroke="white" stroke-linecap="round"/>
							{:else}
							<path d="M1 1H19M1 7H19M1 13H19" stroke="white" stroke-linecap="round"/>
							{/if}
						</svg> 
					</div> -->
					</h1>
				</a>
			</div>
		</div>
	{/if}

	<SvelteToast />

	<div class="_file-icon" />

	<main
		class="
			{$page.url.href.includes('/embed') || isNanoRoute()
			? 'w-full'
			: 'container relative p-8 mx-0 xl:mx-auto'} mt-[45px] sm:mt-[65px] xl:mt-0
			{$page.url.href.includes('/feed/') || $page.url.href.includes('/write-editor')
			? 'max-w-[1200px]'
			: `${$page.url.href.includes('/embed') || isNanoRoute() ? '' : 'max-w-[600px]'}`}
			"
	>
		{#if !$page.url.href.includes('/write') && !$page.url.href.includes('/launch') && !$page.url.href.includes('/embed')}
			{#if !isNanoRoute()}
				<a
					href="/write"
					class="md:hidden flex items-center justify-center"
					style="
			position: fixed;
			bottom: 40px;
			width: 60px;
			height: 60px;
			border: 1px solid rgba(255, 255, 255, 0.8);
			border-radius: 50%;
			z-index: 1111;
			background-color: black;
			box-shadow: 0px 0px 6px #c2daba;
			font-size: 30px;
			right: 20px;
    	opacity: .95;
			"
				>
					+
				</a>
			{/if}
		{/if}

		{#if $allProjects || $page.url.href.includes('/embed')}
			{#if $page.url.href === 'https://nanohq.co/'}
				<Invest />
			{:else if $allProjects || $page.url.href.includes('/embed')}
				<slot />
			{/if}
		{/if}
	</main>

	{#if !$page.url.href.includes('/embed') && !isNanoRoute()}
		<Dock activeIcon="momentum" />
	{/if}

	<footer>
		<p />
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		transition: all 0.2s linear;
	}

	._gradient {
		background: linear-gradient(270deg, #6d1776, #f2a0e8);
		background-size: 400% 400%;

		-webkit-animation: AnimationName 30s ease infinite;
		-moz-animation: AnimationName 30s ease infinite;
		animation: AnimationName 30s ease infinite;
	}

	._link {
		cursor: pointer;
		transition: all linear 0.05s;
	}

	._link:hover {
		background: rgba(255, 255, 255, 0.1);
	}

	@-webkit-keyframes AnimationName {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}
	@-moz-keyframes AnimationName {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}
	@keyframes AnimationName {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}
</style>
