<script>
	import { WebContainer } from '@webcontainer/api';
	import AnsiToHtml from 'ansi-to-html';

	import { page as sveltePage } from '$app/stores';
	import { writable } from 'svelte/store';
	import MonacoEditor from '$lib/components/MonacoEditor.svelte';
	import { SplitPane } from '@rich_harris/svelte-split-pane';

	let isInstall = false;
	let isStarted = false;

	let vm;

	let iframeSrc;

	let logs = writable([]);
	let warnings = writable({});

	const converter = new AnsiToHtml({
		fg: 'var(--sk-text-3)'
	});

	const log_stream = () =>
		new WritableStream({
			write(chunk) {
				if (chunk === '\x1B[1;1H') {
					// clear screen
					logs.set([]);
				} else if (chunk?.startsWith('svelte:warnings:')) {
					/** @type {CompilerWarning} */
					const warn = JSON.parse(chunk.slice(16));
					const current = $warnings[warn.filename];

					if (!current) {
						$warnings[warn.filename] = [warn];
						// the exact same warning may be given multiple times in a row
					} else if (!current.some((s) => s.code === warn.code && s.pos === warn.pos)) {
						current.push(warn);
					}

					schedule_to_update_warning(100);
				} else {
					const log = converter.toHtml(escape_html(chunk)).replace(/\n/g, '<br>');
					logs.update(($logs) => [...$logs, log]);
				}
			}
		});

	let init = async () => {
		vm = await WebContainer.boot();

		await vm.mount($sveltePage.data.codeFiles);

		isInstall = true;

		const installProcess = await vm.spawn('npm', ['install']);

		const installExitCode = await installProcess.exit;

		isInstall = false;

		if (installExitCode !== 0) {
			throw new Error('Unable to run npm install');
		}

		await vm.spawn('chmod', ['a+x', 'node_modules/vite/bin/vite.js']);

		async function launch() {
			if (isStarted) return;
			isStarted = true;

			await new Promise(async (fulfil, reject) => {
				const error_unsub = vm.on('error', (error) => {
					error_unsub();
					reject(new Error(error.message));
				});

				const ready_unsub = vm.on('server-ready', (_port, base) => {
					ready_unsub();
					fulfil(base); // this will be the last thing that happens if everything goes well
				});

				await run_dev();

				async function run_dev() {
					const process = await vm.spawn('turbo', ['run', 'dev']);

					process.output.pipeTo(log_stream());

					// keep restarting dev server (can crash in case of illegal +files for example)
					await process.exit;
					run_dev();
				}
			});
		}

		launch();

		vm.on('server-ready', (port, url) => {
			debugger;
			iframeSrc = url;
		});
	};

	let componentCode = `
<script>
	let count = 0;

	const increment = () => {
		count += 1;
	};
<\/script>

<button on:click={increment}>
	Counter {count}
<\/button>`;
</script>

<SplitPane type="horizontal" id="main" min="100px" max="-100px" pos="50%">
	<section slot="a">this is on the left</section>
	<section slot="b">this is on the right</section>
</SplitPane>

<MonacoEditor codeFile={componentCode} />

<div>
	{#if !vm}
		<button class="_primary" on:click={init}>Start</button>
	{:else}
		{#if isInstall}
			Installing dependencies...
		{/if}

		{#if isStarted && iframeSrc}
			Preview:

			<textarea
				bind:value={componentCode}
				on:change={async () => {
					await vm.fs.writeFile('/src/components/Counter.svelte', componentCode);
				}}
			/>
			<div>
				Preview:
				<iframe class="w-full h-full" src={iframeSrc} />
			</div>
		{/if}
		<!-- <textarea /> -->
	{/if}
</div>
