<script>
	import _ from 'lodash';

	let leftImage;
	let rightImage;

	let cycleImageUrl =
		'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1705051594760-image.png';
	let yourImageUrl =
		'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1705051522682-image.png';
	let couldBeImageUrl =
		'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1705051544041-image.png';

	let isJustChanged;

	let images = _.shuffle([
		{
			name: 'article',
			url: 'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1705068513708-image.png',
			titleUrl:
				'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1705070516114-image.png'
		},

		{
			name: 'website',
			url: 'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1705067901695-image.png',
			titleUrl:
				'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1705070547480-image.png'
		},
		{
			name: 'directory',
			url: 'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1705067946712-image.png',
			titleUrl:
				'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1705070579970-image.png'
		},
		{
			name: 'research',
			url: 'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1705067973719-image.png',
			titleUrl:
				'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1705070604331-image.png'
		},
		{
			name: 'image',
			url: 'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1705067996530-image.png',
			titleUrl:
				'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1705070729132-image.png'
		},
		{
			name: 'video',
			url: 'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1705068021580-image.png',
			titleUrl:
				'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1705070808823-image.png'
		},
		{
			name: 'audio',
			url: 'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1705068047247-image.png',
			titleUrl:
				'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1705070838826-image.png'
		},
		{
			name: 'tweet',
			url: 'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1705068085258-image.png',
			titleUrl:
				'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1705071038420-image.png'
		},
		{
			name: 'saas',
			url: 'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1705068108201-image.png',
			titleUrl:
				'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1705071057708-image.png'
		},
		{
			name: 'micro-saas',
			url: 'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1705068129144-image.png',
			titleUrl:
				'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1705071162056-image.png'
		},
		{
			name: 'service',
			url: 'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1705071391783-image.png',
			titleUrl:
				'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1705071370032-image.png'
		},
		{
			name: 'podcast',
			url: 'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1705068144776-image.png',
			titleUrl:
				'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1705071280600-image.png'
		},
		{
			name: 'book',
			url: 'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1705068186418-image.png',
			titleUrl:
				'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1705071311242-image.png'
		}
	]);

	let shareButtonUrl =
		'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1705058896811-image.png';

	let saveButtonUrl =
		'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1705058880950-image.png';

	let changeRightImage = () => {
		let oldUrl = rightImage?.url;
		rightImage = _.sample(images);
		if (rightImage.url === oldUrl) {
			changeRightImage();
		}
	};

	let changeLeftImage = () => {
		let oldUrl = leftImage?.url;
		leftImage = _.sample(images);
		if (leftImage.url === oldUrl) {
			changeLeftImage();
		}
	};

	let shareText = `Your content could be a startup @momentum_page

https://momentum.page/resources/your-content-could-be-a-startup`;

	leftImage = images[0];
	rightImage = images[1];

	let shareButton =
		'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1705053337903-image.png';
	let launchButton =
		'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1705053373700-image.png';
</script>

<div class="min-h-screen sm:h-screen">
	<div class="relative block sm:flex justify-around sm:h-full">
		<img class="object-contain sm:w-[35%] shrink-0" src={leftImage.url} />

		<div class="h-full shrink-0 w-[400px] px-16 flex flex-col justify-center items-center">
			<div class="w-full  flex flex-col items-center">
				<div class="flex items-center">
					<img
						class="max-h-[60px]"
						src={'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1705072371252-image.png'}
					/>
					<img
						class="max-h-[60px] border border-2 cursor-pointer"
						on:click={changeLeftImage}
						src={leftImage.titleUrl}
					/>
				</div>

				<div>
					<img
						class="max-h-[60px]"
						src={'https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1705072407345-image.png'}
					/>
				</div>
				<div class="flex items-center">
					<img
						class="max-h-[30px] mt-[-70px] self-end"
						src="https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1705072448266-image.png"
					/>
					<img
						class="max-h-[60px] border border-2 cursor-pointer"
						on:click={changeRightImage}
						src={rightImage.titleUrl}
					/>
				</div>
			</div>

			<a
				target="_blank"
				class="mt-16"
				href="https://twitter.com/intent/tweet?text={encodeURIComponent(shareText)}"
				><img class="max-w-[150px]" src={shareButtonUrl} /></a
			>

			<!-- <img
				on:click={() => {
					isJustChanged = true;
					setTimeout(() => {
						isJustChanged = false;
					}, 300);
					changeLeftImage();
					changeRightImage();
				}}
				src="https://ship-app-assets.fra1.digitaloceanspaces.com/stream/rec4sLfwGXzHxLy54/1705068309261-image.png"
				class="hidden sm:block max-w-[150px] {isJustChanged
					? ''
					: 'hover:scale-105'} transition duration-100	cursor-pointer"
				class:animate-spin={isJustChanged}
				class:animate-pulse={!isJustChanged}
			/> -->
			<!-- <div class="hidden sm:flex items-center justify-center flex-wrap w-full mt-16 ">
				<a
					target="_blank"
					href="https://twitter.com/intent/tweet?text={encodeURIComponent(shareText)}"
					><img class="max-w-[200px]" src={shareButtonUrl} /></a
				>
				<img class="max-w-[200px]" src={saveButtonUrl} />
			</div> -->
		</div>

		<img class="object-contain sm:w-[35%] shrink-0" src={rightImage.url} />
	</div>

	<!-- <div class="h-full flex flex-col justify-center pr-32">
		<div class="flex items-center w-full max-w-[300px] mt-8">
			<img class="cursor-pointer hover:rotate-[-2deg]" src={launchButton} />
		</div>
	</div> -->
</div>

<svelte:head>
	<script
		src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.2/iframeResizer.contentWindow.min.js"
		integrity="sha512-14SY6teTzhrLWeL55Q4uCyxr6GQOxF3pEoMxo2mBxXwPRikdMtzKMYWy2B5Lqjr6PHHoGOxZgPaxUYKQrSmu0A=="
		crossorigin="anonymous"
		referrerpolicy="no-referrer"
	></script>
</svelte:head>
