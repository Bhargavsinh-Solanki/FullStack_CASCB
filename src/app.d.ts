// See https://kit.svelte.dev/docs/types#app

import type { DB, User } from '$lib/db/schema.ts';


// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			db: DB;
			user: User;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
