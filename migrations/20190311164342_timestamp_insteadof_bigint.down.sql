ALTER TABLE event_user
	ALTER COLUMN created_at DROP DEFAULT;
ALTER TABLE event_user
	ALTER COLUMN created_at TYPE bigint USING EXTRACT(epoch FROM created_at)::bigint;

ALTER TABLE events
	ALTER COLUMN updated_at DROP DEFAULT,
	ALTER COLUMN created_at DROP DEFAULT;
ALTER TABLE events
	ALTER COLUMN updated_at TYPE bigint USING EXTRACT(epoch FROM created_at)::bigint,
	ALTER COLUMN created_at TYPE bigint USING EXTRACT(epoch FROM updated_at)::bigint;

ALTER TABLE users
	ALTER COLUMN updated_at DROP DEFAULT,
	ALTER COLUMN created_at DROP DEFAULT;
ALTER TABLE users
	ALTER COLUMN updated_at TYPE bigint USING EXTRACT(epoch FROM created_at)::bigint,
	ALTER COLUMN created_at TYPE bigint USING EXTRACT(epoch FROM updated_at)::bigint;
