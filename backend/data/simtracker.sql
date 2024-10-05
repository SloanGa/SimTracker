-- Supprimer les tables si elles existent
DROP TABLE IF EXISTS "flight_log_content";
DROP TABLE IF EXISTS "flight_log";
DROP TABLE IF EXISTS "sessions";
DROP TABLE IF EXISTS "users";
-- Créer les tables
CREATE TABLE "users"
(
    "id"          SERIAL PRIMARY KEY  NOT NULL,
    "firstname"   varchar(128)        NOT NULL,
    "lastname"    varchar(128)        NOT NULL,
    "email"       varchar(128) UNIQUE NOT NULL,
    "password"    varchar(128)        NOT NULL,
    "picture_url" varchar(255),
    "simbrief_id" varchar(128),
    "created_at"  TIMESTAMPTZ         NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at"  TIMESTAMPTZ
);

CREATE TABLE "flight_log_content"
(
    "id"            SERIAL PRIMARY KEY NOT NULL,
    "date"          varchar(128),
    "flight_number" varchar(128),
    "departure"     varchar(4),
    "arrival"       varchar(4),
    "flight_time"   integer,
    "aircraft_name" varchar(128),
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