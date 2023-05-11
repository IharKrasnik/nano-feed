<script>
	let clazz;

	export { clazz as class };

	import moment from 'moment';
	import _ from 'lodash';

	let days = _.range(moment().daysInMonth());

	let currentDay = moment().date();
</script>

<div class="sm:flex sm:flex-row justify-center items-center {clazz}">
	<div class="flex flex-col items-center shrink-0">
		<div class="font-bold">⚡️ {moment().startOf('month').format('MMM DD')}</div>
		<div class="text-base font-normal">Kick Off Day</div>
	</div>
	<div class="my-8 sm:my-0 mx-8 sm:flex sm:flex-row grid grid-cols-7">
		{#each days as day}
			<div class="relative">
				<div
					class="day mr-1"
					class:past={day < currentDay}
					class:today={day === currentDay}
					class:future={day > currentDay}
				/>
				{#if day === currentDay}
					<div
						class="absolute bottom-0"
						style="margin-left: 5px; padding-top: 5px; transform: translateY(100%)"
					>
						👆
					</div>
				{/if}
			</div>
		{/each}
	</div>
	<div class="flex flex-col items-center shrink-0">
		<div class="font-bold">📺 {moment().endOf('month').format('MMM DD')}</div>
		<div class="text-base font-normal">Demo Day</div>
	</div>
	<div />
</div>

<style>
	.day {
		width: 20px;
		height: 20px;
		border: 1px white solid;
		border-radius: 50%;
		margin: 2px;
	}

	@media (max-width: 640px) {
		.day {
			margin-bottom: 5px;
			/* width: 10px; */
			/* height: 10px; */
		}
	}

	.past {
		opacity: 0.6;
		background: white;
	}

	.today {
		background: white;
	}
</style>
