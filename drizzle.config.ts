import { defineConfig } from 'drizzle-kit';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const env = process.env;

const HOST = env.DB_HOST;
const PORT = env.DB_PORT;
const USER = env.DB_USER;
const PASSWORD = env.DB_PASSWORD;
const NAME = env.DB_NAME;

if (!HOST || !PORT || !USER || !PASSWORD || !NAME) {
	throw new Error('POSTGRES CONNECTION SETTINGS are not defined');
}

const POSTGRES_CONNECTION_STRING = `postgresql://${USER}:${PASSWORD}@${HOST}:${PORT}/${NAME}`;

export default defineConfig({
	schema: './src/lib/db/*',
	out: './drizzle',
	dialect: 'postgresql',
	dbCredentials: {
		url: POSTGRES_CONNECTION_STRING,
		ssl: false
	},
	introspect: {
		casing: 'camel'
	}
});
