// place files you want to import through the `$lib` alias in this folder.
import { integer, pgTable, primaryKey, serial, varchar, text } from 'drizzle-orm/pg-core';
import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';

export type DB = PostgresJsDatabase<Record<string, never>>;

// Users Schema
export const usersTable = pgTable("users", {
	id: serial("id").primaryKey().notNull(),
	orcid: varchar('orcid', { length: 20 }).notNull(),
	lastName: text('last_name').notNull(),
	firstName: text('first_name').notNull(),
	email: varchar('email', { length: 100 }).notNull(),
	sessionToken: varchar('session_token', { length: 255 }) // Add session token for authentication
	// TODO: add other information about users
});

export type User = typeof usersTable.$inferSelect;


// Projects Schema
export const projectsTable = pgTable('projects', {
	id: serial('id').primaryKey().notNull(),
	number: varchar('number', { length: 50 }).notNull(),
	description: text('description').notNull(),
	leader: integer('leader').notNull().references(() => usersTable.id, { onUpdate: 'cascade', onDelete: 'cascade' })
});

export type Project = typeof projectsTable.$inferSelect;


// Link Users and Projects together with pivot table
// This makes it so that users can have many projects and projects can have many users
// Assignment is deleted if user or project is deleted
export const assignmentsTable = pgTable("project_assignments", {
	projectId: integer("project_id").notNull().references(() => projectsTable.id, { onUpdate: "cascade", onDelete: "cascade" }),
	userId: integer("user_id").notNull().references(() => usersTable.id, { onUpdate: "cascade", onDelete: "cascade" }),
},
	(table) => {
		return {
			// primary key is a combination of both user id and project id, since this combination is unique
			courseSpotsPkey: primaryKey({ columns: [table.projectId, table.userId], name: "course_spots_pkey" }),
		}
	}
);

export type Assignment = typeof assignmentsTable.$inferSelect;