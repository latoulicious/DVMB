import {
  pgTable,
  pgEnum,
  bigserial,
  varchar,
  text,
  boolean,
  timestamp,
  numeric,
  real
} from 'drizzle-orm/pg-core'

export const genderEnum = pgEnum('gender', ['M', 'F'])

export const rolesTable = pgTable('roles', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  name: varchar('name', { length: 32 }).notNull(), // Role name
  description: text('description') // Optional role description
})

export const usersTable = pgTable('users', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  gender: genderEnum(),
  status: boolean('status').notNull().default(true), // True for active, False for inactive
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdateFn(() => new Date())
    .notNull(),
  deletedAt: timestamp('deleted_at'), // Nullable for soft deletion
  roleId: bigserial('role_id', { mode: 'number' }).references(
    () => rolesTable.id
  ) // Defining the foreign key relationship
})

export const karyawanTable = pgTable('karyawan', {
  ID: bigserial('id', { mode: 'number' }).primaryKey(),
  karyawanId: bigserial('karyawan_id', { mode: 'number' }),
  name: varchar('name', { length: 255 }).notNull(),
  genderEnum: genderEnum(),
  address: varchar('address', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  position: varchar('position', { length: 255 }).notNull(),
  joindate: varchar('joindate', { length: 255 }).notNull(),
  salary: real('salary').notNull(),
  status: boolean('status').notNull().default(true),
  departmentId: bigserial('department_id', { mode: 'number' }),
  education: varchar('education', { length: 255 }).notNull(),
  ktp: numeric('ktp', { precision: 16, scale: 0 }).notNull()
})
