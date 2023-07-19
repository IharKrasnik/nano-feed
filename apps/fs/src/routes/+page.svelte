<script>
	import _ from 'lodash';
	import moment from 'moment-timezone';
	import { onMount } from 'svelte';
	import { v4 as uuidv4 } from 'uuid';
	import { slide, fly, scale, fade } from 'svelte/transition';
	import { goto } from '$app/navigation';

	import { get, post, put } from 'lib/api';
	import currentUser from 'lib/stores/currentUser';
	import allBrands from '$lib/stores/allBrands';
	import brandDraft from '$lib/stores/brandDraft';
	import tooltip from 'lib/use/tooltip';
	import clickOutside from 'lib/use/clickOutside';
	import BrowserFrame from 'lib/components/BrowserFrame.svelte';
	import EditOpenGraphImage from '$lib/components/edit/OpenGraphImage.svelte';
	import EditColorPicker from '$lib/components/edit/ColorPicker.svelte';
	import FileInput from 'lib/components/FileInput.svelte';
	import OpenGraphPreview from '$lib/components/OpenGraphPreview.svelte';
	import EmojiPicker from 'lib/components/EmojiPicker.svelte';

	let fileTypes = [
		{ type: 'website', name: 'Website Pages' },
		{ type: 'micro-product', name: 'Micro-Products' },
		{ type: 'saas', name: 'SaaS products' },
		{ type: 'blog', name: 'Blog Articles' },
		{ type: 'newsletter', name: 'Newsletter Emails' },
		{ type: 'support', name: 'Support Articles + Chats' },
		{ type: 'social', name: 'Social Media Feeds' },
		{ type: 'coderepo', name: 'Code Repositories' },
		{ type: 'mediakit', name: 'Design/Brand/MediaKit Files' },
		{ type: 'team', name: 'Team/Process/Investor Docs' },
		{ type: 'database', name: 'Analytics and Databases' },
		{ type: 'privatechat', name: 'Slack Messages + Email Inbox' }
	];

	let dirs = [
		{
			type: 'website',
			dirs: [
				{
					name: 'Main Website',
					files: [
						{
							name: 'Home',
							url: 'https://mmntm.build'
						},
						{
							name: 'Feed',
							url: 'https://mmntm.build/feed'
						}
					]
				},
				{
					name: 'Page',
					files: [
						{
							name: 'About',
							url: 'https://page.mmntm.build/about'
						},
						{
							name: 'Explore',
							url: 'https://page.mmntm.build/explore'
						}
					]
				}
			]
		},
		{
			type: 'saas',
			dirs: [
				{
					name: 'FS',
					files: [
						{
							name: 'Home',
							url: 'https://fs.mmntm.build'
						}
					]
				},
				{
					name: 'Feed',
					files: [
						{
							name: 'Home',
							url: 'https://feed.mmntm.build'
						}
					]
				},
				{
					name: 'Page',
					files: [
						{
							name: 'Home',
							url: 'https://page.mmntm.build'
						}
					]
				},
				{
					name: 'Wave',
					files: [
						{
							name: 'Home',
							url: 'https://wave.mmntm.build'
						}
					]
				}
			]
		},
		{
			type: 'micro-product',
			dirs: [
				{
					name: 'All',
					files: [
						{
							name: 'Momentum Playbook',
							url: 'https://play.nanohq.co'
						},
						{
							name: 'Grit',
							url: 'https://grit.nanohq.co'
						}
					]
				}
			]
		},
		{
			type: 'social',
			dirs: [
				{
					name: 'All Social',
					files: [
						{
							name: 'Twitter MMNTM',
							url: 'https://twitter.com/mmntm_build'
						}
					]
				}
			]
		}
		// {
		// 	type: 'blog',
		// 	name: ''
		// }
	];
</script>

<div class="container mx-auto mt-8">
	{#each dirs as parentdir}
		<div class="flex items-center  mt-4">
			<div class="text-lg font-bold">📁 {parentdir.type}s</div>
			<a class="ml-2 text-lg opacity-80 cursor-pointer">+</a>
		</div>
		<div class="px-4" style="border-left: 1px rgba(255,255,255,.3) solid;">
			{#each parentdir.dirs as dir}
				<div class="flex items-center mt-2">
					<div>📁 {dir.name}</div>
					<a class="ml-2 text-lg opacity-80 cursor-pointer">+</a>
				</div>

				{#each dir.files as file}
					<div class="px-4" style="border-left: 1px rgba(255,255,255,.3) solid;">
						📄 {file.name}: <a href={file.url} target="_blank">{file.url}</a>
					</div>
				{/each}
			{/each}
		</div>
	{/each}
</div>
<div class="container mx-auto mt-8">
	<div class="grid grid-cols-4 cursor-pointer">
		{#each fileTypes as fileType}
			<div class="p-4 m-4" style="border: 1px rgba(255,255,255, .3) solid;">
				📁 {fileType.name}
			</div>
		{/each}
	</div>
</div>
