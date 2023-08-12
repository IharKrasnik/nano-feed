<script>
	import { put } from 'lib/api';
	import moment from 'moment';
	import { fade } from 'svelte/transition';
	import DateInput from 'lib/components/DateInput.svelte';
	import currentUser from 'lib/stores/currentUser';
	import Button from 'lib/components/Button.svelte';

	let clazz = '';
	export { clazz as class };

	export let project;
	export let onUpdated = () => {};

	let goal = project.goal || {
		createdOn: new Date(),
		deadlineOn: moment().add(1, 'week').toDate(),
		goal: ''
	};

	let suggestions = [
		'Post and engage 30+ minutes daily',
		'Reach out to 100 prospective clients',
		'Do 10 user interviews',
		'Get 10 signups',
		'Get first paid user',
		'Get 5 backlinks',
		'Post 7 articles',
		'Improve conversion rate',
		'Launch on ProductHunt',
		'Get 5 founders on calls',
		'Record 3 podcasts'
	];

	let updateGoal = async () => {
		project.goal = await put(`projects/${project._id}/goal`, goal);
		onUpdated(project.goal);
	};
</script>

<div class={clazz}>
	<h2 class="text-2xl">Set your goal</h2>
	<h3 class="text-xl mb-4 mt-2">There's no growth without goals</h3>

	<div class="bg-zinc-900 p-4 rounded-lg mb-8">
		Goals keep you accountable and give you guidance in your daily work so you waste less time. <br
		/>
		• Set measureable goal related to traction <br />
		• Be ambitious, aim to hit ~80% <br />
		• Split goal to measureable daily tasks

		<div class="mt-4">
			<div class="mb-2">
				<b>Some examples to get you started:</b>
			</div>
			<div class="flex flex-wrap">
				{#each suggestions as suggestion}
					<div
						class="shrink-0 py-2 px-4 mr-2 mb-2 rounded-lg cursor-pointer transition hover:bg-zinc-700"
						on:click={() => (goal.goal = suggestion)}
						style="border: 1px rgba(255,255,255,.3) solid;"
					>
						{suggestion}
					</div>
				{/each}
			</div>
		</div>
	</div>

	<label>Measureable Goal</label>
	<input type="text" placeholder="Get 10 users" bind:value={goal.goal} />

	<label class="mt-4">Deadline</label>
	<DateInput bind:date={goal.deadlineOn} />
	<div />

	<div />

	{#if goal.goal}
		<div class="mt-8" in:fade={{ duration: 200 }}>
			<img src={$currentUser.avatarUrl} class="w-[30px] h-[30px] rounded-full" />

			<div class="text-lg mt-4 p-4 rounded-xl bg-zinc-600 inline-block">
				I will <b>{(goal.goal && goal.goal.toLowerCase()) || 'get 10 users'}</b> by
				<b>{moment(goal.deadlineOn).format('MMM DD')}</b>
				(In {moment.duration(moment(goal.deadlineOn).diff(new Date())).days() + 1} days)
			</div>

			<div class="flex mt-2">
				<div in:fade={{ delay: 1000, duration: 150 }}>
					<div class="p-2 mr-2 rounded-xl bg-zinc-700 inline-block">🔥</div>
				</div>
				<div in:fade={{ delay: 1300, duration: 150 }}>
					<div class="p-2 mr-2 rounded-xl bg-zinc-700 inline-block">💯</div>
				</div>
				<div in:fade={{ delay: 2000, duration: 150 }}>
					<div class="p-2 mr-2 rounded-xl bg-zinc-700 inline-block">🤩</div>
				</div>
			</div>
		</div>

		<Button class="mt-8" onClick={updateGoal}>Set Goal</Button>

		<hr class="opacity-30 my-8" />

		PS: Failure is okay! It takes time to get used to goals.
		<br />
		So you better start early and be ahead.
	{/if}
</div>
