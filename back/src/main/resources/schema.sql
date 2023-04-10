DROP TABLE IF EXISTS users_roles;

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS authorities CASCADE;



CREATE TABLE users (
    id serial PRIMARY KEY,
    email VARCHAR ( 255 ) UNIQUE NOT NULL,
    first_name varchar(64) NOT NULL,
    last_name varchar(128) NOT NULL,
    password varchar(64) NOT NULL,
    enabled boolean NOT NULL
);

CREATE TABLE roles (
    id serial PRIMARY KEY,
    name varchar(50) NOT NULL
);

CREATE TABLE users_roles (
    id serial PRIMARY KEY,
    user_id int NOT NULL,
    role_id int NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(role_id) REFERENCES roles(id)
);
