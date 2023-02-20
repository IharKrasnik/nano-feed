<script>
	import moment from 'moment-timezone';

	import Modal from 'lib/components/Modal.svelte';
	import Loader from 'lib/components/Loader.svelte';

	import currentUser from 'lib/stores/currentUser';
	import allProjects from '$lib/stores/allProjects';

	import WaveDashboard from 'lib/components/wave/Dashboard.svelte';
	import WaveShortStats from 'lib/components/wave/ShortStats.svelte';
	import BrowserFrame from '$lib/components/BrowserFrame.svelte';

	import { WAVE_URL } from 'lib/env';

	import { get, post } from 'lib/api';

	export let project;

	let isLoading = false;

	let isModalOpen = false;

	let metrics;

	let addWaveProject = async () => {
		let waveProject = await post(`projects/${project._id}/wave`);

		$allProjects = $allProjects.map((p) => {
			if (p._id === project._id) {
				p.waveProject = waveProject;
			}

			return p;
		});

		window.open(`${WAVE_URL}/p/${waveProject.url}`, '_blank');
	};

	let timeframe;
	let timezone = moment.tz.guess();

	let loadMetrics = async ({ projectId, subProjectId }) => {
		metrics = null;

		timeframe = '24_hours';

		if (project && new Date(project.createdOn) < moment().subtract(1, 'week').toDate()) {
			timeframe = '7_days';
		}

		metrics = await get(`waveProjects/${projectId}/stats`, {
			timeframe,
			timezone,
			...(subProjectId ? { subProjectId } : {})
		});
	};

	let prevProjectId;

	$: if (project) {
		if (!metrics || prevProjectId !== project.waveProject?._id) {
			if (project.waveProject?._id) {
				loadMetrics({ projectId: project.waveProject._id });

				prevProjectId = project.waveProject._id;
			} else {
				prevProjectId = null;
			}
		}
	}

	let prevPageId;

	$: if (project) {
		if (!metrics || prevPageId !== project.page?._id) {
			if (project.page?._id) {
				loadMetrics({ projectId: 'page.mmntm.build', subProjectId: project.page._id });
				prevPageId = project.page._id;
			} else {
				prevPageId = null;
			}
		}
	}

	let openModal = () => {
		isModalOpen = true;

		if (!metrics) {
			loadMetrics({ projectId: 'mmntm.build' });
		}
	};
</script>

{#if isModalOpen}
	<Modal isShown onClosed={() => (isModalOpen = false)} maxWidth={900}>
		<div class="p-8">
			<h2>{project?.page?._id || project?.waveProject?._id ? '' : 'Add '}Wave Analytics</h2>
			<h3>Wave is a stupid-simple web analytics dashboard.</h3>

			{#if project.waveProject?._id || project.page?._id}
				<div class="mt-4 text-lg opacity-70">
					{project.waveProject?.url || project.url}
				</div>

				<div class="mt-8">
					<WaveDashboard stats={metrics} bind:timeframe />
				</div>
			{:else}
				<div class="mt-8">
					<div class="bg-zinc-900 p-8 rounded-xl">
						Add wave script to &lt;head&gt; at <a
							href={project.url}
							target="_blank"
							class="text-sm opacity-80">{project?.url || ''}</a
						>
						to enable web analytics. <br />
						You'll probably did it dozens time before with other analytics. It's simple.
						<div>
							{#if isLoading}
								<Loader />
							{:else}
								<button class="small mt-4" on:click={addWaveProject}> Add Wave Analytics </button>
								<div class="mt-2 text-sm opacity-70">It will take about a minute.</div>
							{/if}
						</div>
					</div>

					<div class="w-full text-center mt-8 opacity-100">💥 It's time for a demo!</div>

					<div class="w-full text-center text-sm mb-8 opacity-80">
						Here's how public Wave dashboard for mmntm.build looks like. <br />
						We'll create the same dashboard for {project.title}.
					</div>

					<BrowserFrame url="{WAVE_URL}/p/mmntm.build">
						<WaveDashboard stats={metrics} bind:timeframe />
					</BrowserFrame>
				</div>
			{/if}
		</div>
	</Modal>
{/if}

{#if project && (project?.waveProject?._id || project?.page?._id)}
	<button class="mt-4 w-full small" on:click={openModal}>
		{#if project?.waveProject?._id || project?.page?._id}
			{#if metrics}
				<WaveShortStats bind:metrics bind:timeframe />
			{/if}
		{:else if $currentUser?.isAdmin || project.creator?._id === $currentUser?._id}
			👋 Add Wave Analytics
		{/if}
	</button>
{/if}
