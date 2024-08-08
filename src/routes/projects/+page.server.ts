import { projectsTable, usersTable } from '$lib/db/schema';
import { eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';

// Universal load function: can run on the server but also on the web page
// It will run on the server to preload the data for the web page and bundle the data together with the page request.
// If the page is already loaded it will run in the browser to fetch the data from the api.
export const load: PageServerLoad = async ({ locals }) => {
	const db = locals.db;

	const projects = await db
		.select()
		.from(projectsTable)
		.leftJoin(usersTable, eq(projectsTable.leader, usersTable.id));

	const users = await db.select().from(usersTable);

	return { projects, users };
};

export const actions: Actions = {
	create: async ({ locals, request }) => {
		const db = locals.db;
		const body = await request.formData();
		const description = body.get('description') as string;
		const leader = parseInt(body.get('leader') as string);

		const project = await db.insert(projectsTable).values({ number: '0', description, leader });

		return { project };
	},

	delete: async ({ locals, request }) => {
		const body = await request.formData();
		console.log(body);
		const projectIdString = body.get('id') as string;
		const id = parseInt(projectIdString);

		const db = locals.db;
		await db.delete(projectsTable).where(eq(projectsTable.id, id));
	}
};
