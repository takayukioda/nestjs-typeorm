CREATE TABLE IF NOT EXISTS admin_users (
  id         BIGSERIAL    PRIMARY KEY,
  name       VARCHAR(255) NOT NULL,
  email      VARCHAR(255) NOT NULL,
  password   VARCHAR(255) NOT NULL,
  created_at timestamp    NOT NULL,
  updated_at timestamp    NOT NULL,
  UNIQUE (email),
  UNIQUE (name)
);

