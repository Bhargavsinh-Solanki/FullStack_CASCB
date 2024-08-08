<script lang="ts">
	import type { Project, User } from '$lib/db/schema';

	export let project: Project;
	export let leader: User;
</script>

<div>
	<h2>{project.description}</h2>
	<small>id: {project.id}</small>
	<p>Leader: {leader.firstName} {leader.lastName}</p>

	<form action="/projects?/delete" method="post">
		<input type="hidden" name="id" value="{project.id}" />
		<button type="submit">Delete</button>
	</form>

	<!-- edit -->
	<form action="/projects?/edit" method="post">
		<input type="hidden" name="id" value="{project.id}" />
		<label>
			Description:
			<input type="text" name="description" value="{project.description}" />
		</label>
		<button type="submit">Edit</button>
	</form>
</div>

<style>
	div {
		border: 1px solid #ccc;
		padding: 1rem;
		margin: 1rem 0;
	}
	h2 {
		margin: 0;
	}
	small {
		color: #666;
	}

	button{
		background-color: #f44336;
		color: white;
		border: none;
		border-radius: 4px;
		padding: 0.5rem 1rem;
		cursor: pointer;
	}
</style>
