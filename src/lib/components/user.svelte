<script lang="ts">
	import type { User } from '$lib/db/schema';

	export let user: User;
</script>

<div>
	<h1>{user.firstName} {user.lastName}</h1>
	<p>{user.email}</p>

    <!-- TODO: trigger users delete action -->
	<form>
		<button type="submit">delete</button>
	</form>
</div>

<style>
	button {
		background-color: red;
		color: white;
		border: none;
		padding: 5px 10px;
		border-radius: 5px;
	}
</style>
