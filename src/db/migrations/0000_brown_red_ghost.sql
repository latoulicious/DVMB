CREATE TYPE "public"."gender" AS ENUM('M', 'F');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "roles" (
  "id" bigserial PRIMARY KEY NOT NULL,
  "name" varchar(32) NOT NULL,
  "description" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
  "id" bigserial PRIMARY KEY NOT NULL,
  "email" varchar(255) NOT NULL UNIQUE,
  "password" varchar(255) NOT NULL,
  "name" varchar(255) NOT NULL,
  "gender" gender,
  "status" boolean DEFAULT true NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL,
  "deleted_at" timestamp,
  "role_id" bigserial NOT NULL REFERENCES "roles"("id")
);
--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE no action ON UPDATE no action;