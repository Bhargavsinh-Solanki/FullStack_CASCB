ALTER TABLE "projects" ADD COLUMN "number" varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "description" text NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "leader" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "orcid" varchar(20) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "last_name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "first_name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "email" varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "session_token" varchar(255);--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects" ADD CONSTRAINT "projects_leader_users_id_fk" FOREIGN KEY ("leader") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
