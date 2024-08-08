<script lang="ts">
	import Project from '$lib/components/project.svelte';

	export let data;
</script>

<h1>Projects</h1>

<form action="?/create" method="post">
	<label>
		Project description:
		<input type="text" name="description">
	</label>
	<label>
		Leader:
		<select name="leader">
			{#each data.users as user}
				<option value={user.id}>{user.firstName} {user.lastName}</option>
			{/each}
		</select>
	</label>
	<button type="submit">Create new project</button>
</form>

{#each data.projects as project}
	{#if project.users}
		<Project project={project.projects} leader={project.users}></Project>
	{/if}
{/each}

<style>
	form {
		margin-bottom: 1em;
		display: flex;
		flex-direction: column;
		max-width: 400px;
		margin: auto;
		
	}
	label{
		display: flex;
		flex-direction: column;
		margin-bottom: 1em;
	}
</style>
