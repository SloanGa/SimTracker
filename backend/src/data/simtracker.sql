-- Supprimer les tables si elles existent
DROP TABLE IF EXISTS "aircraft";
DROP TABLE IF EXISTS "flight_log_content";
DROP TABLE IF EXISTS "flight_log";
DROP TABLE IF EXISTS "users";
DROP TABLE IF EXISTS "sessions";
-- Créer les tables
CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "firstname" varchar,
  "lastname" varchar,
  "email" varchar UNIQUE,
  "password" char(60),
  "picture_url" varchar
);
CREATE TABLE "aircraft" (
  "id" SERIAL PRIMARY KEY,
  "model" varchar,
  "registration" varchar,
  "company" varchar,
  "flight_time" integer,
  "total_flight" integer,
  "user_id" integer REFERENCES "users"("id") ON DELETE
  SET NULL
);
CREATE TABLE "flight_log" (
  "id" SERIAL PRIMARY KEY,
  "user_id" integer REFERENCES "users"("id") ON DELETE CASCADE
);
CREATE TABLE "flight_log_content" (
  "flight_log_id" integer REFERENCES "flight_log"("id") ON DELETE CASCADE,
  "date" timestamp,
  "flight_number" varchar,
  "departure" varchar(4),
  "arrival" varchar(4),
  "alt" varchar(4),
  "flight_time" integer,
  "aircraft_id" integer REFERENCES "aircraft"("id") ON DELETE
  SET NULL
);
CREATE TABLE "sessions" (
  "sid" varchar PRIMARY KEY,
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
);
CREATE INDEX "IDX_sessions_expire" ON "sessions" ("expire");