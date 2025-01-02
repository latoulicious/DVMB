CREATE TABLE "karyawan" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"karyawan_id" bigserial NOT NULL,
	"name" varchar(255) NOT NULL,
	"genderEnum" "gender",
	"address" varchar(255) NOT NULL,
	"phone" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"position" varchar(255) NOT NULL,
	"joindate" varchar(255) NOT NULL,
	"salary" real NOT NULL,
	"status" boolean DEFAULT true NOT NULL,
	"department_id" bigserial NOT NULL,
	"education" varchar(255) NOT NULL,
	"ktp" numeric(16, 0) NOT NULL,
	CONSTRAINT "karyawan_email_unique" UNIQUE("email")
);
