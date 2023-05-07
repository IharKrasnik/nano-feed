<script>
	import allProjects from '$lib/stores/allProjects';
</script>

hey

<table>
	<thead>
		<td>Name</td>
		<td>Pitch</td>
		<td>Views</td>
		<td>Sign Ups</td>
		<td>Content</td>
		<td>MRR</td>
	</thead>
	{#each $allProjects as project}
		<tr>
			<td>
				{project.title}
			</td>
			<td>
				{project.description}
			</td>
			<td />
			<td />
		</tr>
	{/each}
</table>
