<script lang="ts">
	import Project from '$lib/components/project.svelte';
	import User from '$lib/components/user.svelte';

	export let data;
</script>

<h1>Users</h1>

<form action="?/create" method="post">
	<label>
		first name
		<input type="text" name="firstName">
	</label>

	<label>
		last name
		<input type="text" name="lastName">
	</label>

	<label>
		email
		<input type="email" name="email">
	</label>

	<label>
		orc id
		<input type="text" name="orcId">
	</label>

	<button type="submit">Create new user</button>
</form>

{#each data.users as user}
	<User {user} />
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
