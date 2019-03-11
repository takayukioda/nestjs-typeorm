CREATE TABLE IF NOT EXISTS users (
  id         BIGSERIAL    PRIMARY KEY,
  name       VARCHAR(255) NOT NULL,
  email      VARCHAR(255) NOT NULL,
  password   VARCHAR(255) NOT NULL,
  created_at BIGINT       NOT NULL,
  updated_at BIGINT       NOT NULL,
  UNIQUE (email),
  UNIQUE (name)
);

CREATE TABLE IF NOT EXISTS events (
  id         BIGSERIAL PRIMARY KEY,
  name       VARCHAR(255) NOT NULL,
  start_date BIGINT     NOT NULL,
  end_date   BIGINT     NOT NULL,
  created_at BIGINT     NOT NULL,
  updated_at BIGINT     NOT NULL
);

CREATE TABLE IF NOT EXISTS event_user (
  id         BIGSERIAL PRIMARY KEY,
  event_id   BIGINT    NOT NULL,
  user_id    BIGINT    NOT NULL,
  created_at BIGINT    NOT NULL,
  UNIQUE (event_id, user_id),
  FOREIGN KEY (event_id) REFERENCES events (id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);
