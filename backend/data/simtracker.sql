-- Supprimer les tables si elles existent
DROP TABLE IF EXISTS "flight_log_content";
DROP TABLE IF EXISTS "flight_log";
DROP TABLE IF EXISTS "sessions";
DROP TABLE IF EXISTS "users";
-- Créer les tables
CREATE TABLE "users"
(
    "id"          SERIAL PRIMARY KEY NOT NULL,
    "firstname"   varchar            NOT NULL,
    "lastname"    varchar            NOT NULL,
    "email"       varchar UNIQUE     NOT NULL,
    "password"    char(60)           NOT NULL,
    "picture_url" varchar,
    "simbrief_id" varchar,
    "created_at"  TIMESTAMPTZ        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at"  TIMESTAMPTZ
);

CREATE TABLE "flight_log_content"
(
    "id"            SERIAL PRIMARY KEY NOT NULL,
    "date"          varchar,
    "flight_number" varchar,
    "departure"     varchar(4),
    "arrival"       varchar(4),
    "flight_time"   integer,
    "aircraft_name" varchar,
    "user_id"       integer REFERENCES "users" ("id") ON DELETE CASCADE,
    "created_at"    TIMESTAMPTZ        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at"    TIMESTAMPTZ
);
CREATE TABLE "sessions"
(
    "sid"        varchar PRIMARY KEY,
    "sess"       json         NOT NULL,
    "expire"     timestamp(6) NOT NULL,
    "created_at" TIMESTAMPTZ  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ
);
CREATE INDEX "IDX_sessions_expire" ON "sessions" ("expire");