<header>
	<nav>
        <a href="/">Home</a>
        <a href="/users">Users</a>
		<a href="/projects">Projects</a>
	</nav>
</header>

<main>
    <slot></slot>
</main>

<style>
	:global(body) {
		font-family: Arial, sans-serif;
		margin: 0;
		padding: 0;
	}

	:global(*) {
		box-sizing: border-box;
	}

	header {
		background-color: #333;
		color: white;
		padding: 1rem;
	}

    a {
        color: white;
        margin-left: 1rem;
    }
</style>
