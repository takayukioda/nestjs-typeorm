-- Although we specified timestamp column with bigint, timestamp uses same data type as well
-- https://www.postgresql.org/docs/9.6/datatype-datetime.html#DATATYPE-DATETIME
ALTER TABLE users
	ALTER COLUMN created_at TYPE timestamp USING to_timestamp(created_at),
	ALTER COLUMN updated_at TYPE timestamp USING to_timestamp(updated_at);
ALTER TABLE users
	ALTER COLUMN created_at SET DEFAULT now(),
	ALTER COLUMN updated_at SET DEFAULT now();

ALTER TABLE events
	ALTER COLUMN created_at TYPE timestamp USING to_timestamp(created_at),
	ALTER COLUMN updated_at TYPE timestamp USING to_timestamp(updated_at);
ALTER TABLE events
	ALTER COLUMN created_at SET DEFAULT now(),
	ALTER COLUMN updated_at SET DEFAULT now();

ALTER TABLE event_user
	ALTER COLUMN created_at TYPE timestamp USING to_timestamp(created_at);
ALTER TABLE event_user
	ALTER COLUMN created_at SET DEFAULT now();
