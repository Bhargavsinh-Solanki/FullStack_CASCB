import { usersTable } from '$lib/db/schema';
import type { Actions, PageServerLoad } from './$types';

// Universal load function: can run on the server but also on the web page
// It will run on the server to preload the data for the web page and bundle the data together with the page request.
// If the page is already loaded it will run in the browser to fetch the data from the api.
export const load: PageServerLoad = async ({ locals }) => {
	const db = locals.db;

	const users = await db.select().from(usersTable);

	return { users };
};

export const actions: Actions = {
	create: async ({ locals, request }) => {
		const db = locals.db;
		const body = await request.formData();

		const firstName = body.get('firstName') as string;
		const lastName = body.get('lastName') as string;
		const email = body.get('email') as string;
		const orcId = body.get('orcId') as string;

		await db.insert(usersTable).values({
			firstName,
			lastName,
			email,
			orcid: orcId,
		});
	}
};
