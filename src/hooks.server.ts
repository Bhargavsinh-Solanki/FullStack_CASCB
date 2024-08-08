import { redirect, type Handle } from '@sveltejs/kit';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { building } from '$app/environment';
import { usersTable, type DB } from '$lib/db/schema';
import { env } from '$env/dynamic/private';
import { eq } from 'drizzle-orm';

let db: DB;

if (!building) {
	const HOST = env.DB_HOST;
	const PORT = env.DB_PORT;
	const USER = env.DB_USER;
	const PASSWORD = env.DB_PASSWORD;
	const NAME = env.DB_NAME;
	const POSTGRES_CONNECTION_STRING = `postgresql://${USER}:${PASSWORD}@${HOST}:${PORT}/${NAME}`;

	const client = postgres(POSTGRES_CONNECTION_STRING);
	db = drizzle(client, { logger: true });
}

const publicRoutes = ['/'];

// this function runs for every request and sets up the database connection
// you can also do authorization here to redirect users that do not have a session cookie to the login page
export const handle: Handle = async ({ event, resolve }) => {
	// TODO: dont require authentication for routes in the (public) routes group
	const routeInPublicGroup = event.route.id?.startsWith('/(public)/') ?? false;
	const isPublicRoute = publicRoutes.includes(event.route.id ?? '');

	event.locals.db = db;

	if (building || routeInPublicGroup || isPublicRoute) {
		return resolve(event);
	}

	// adds the db connection to the `locals` variables. They are accessible in every request
	const sessionCookie = event.cookies.get('user');

	// if (!sessionCookie) {
		// return a redirect response if the user is not logged in
		// currently disabled because there is no login yet
		// code 302 => temporary redirect, otherwise the browser caches this and always redirects the user even if logged in
		// redirect(302, '/login');
	// }

	// TODO: get user with the matching session cookie from the database and add it to the `locals` variables.
	if (sessionCookie) {
		const [user] = await db
			.select()
			.from(usersTable)
			.where(eq(usersTable.sessionToken, sessionCookie))
			.limit(1);

		if (user) {
			event.locals.user = user;
		}
	}

	return resolve(event);
};
