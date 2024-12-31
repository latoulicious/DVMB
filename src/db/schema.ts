import { bigint, pgTable, varchar, text, boolean, timestamp } from "drizzle-orm/pg-core";

export const roles = pgTable("roles", {
  id: bigint("id", { mode: "number" })
    .primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),  // Role name
  description: text("description"),                 // Optional role description
});

export const users = pgTable("users", {
  id: bigint("id", { mode: "number" })
    .primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  email: varchar("email", { length: 256 }).notNull().unique(),
  gender: varchar("gender", { length: 1 }).notNull(), // "M" or "F"
  status: boolean("status").notNull().default(true),  // True for active, False for inactive
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdateFn(() => new Date())
    .notNull(),
  deletedAt: timestamp("deleted_at"),                // Nullable for soft deletion
  roleId: bigint("role_id", { mode: "number" })      // Foreign key to roles.id
    .references(() => roles.id)                      // Defining the foreign key relationship
});
