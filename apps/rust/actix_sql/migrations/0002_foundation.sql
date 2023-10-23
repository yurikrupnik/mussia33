-- Add migration script here
create table if not exists todos (
    id serial primary key,
    title varchar(255) not null,
    completed boolean not null default false
);

-- create TABLE book (
--   title varchar not null,
--   author varchar not nullw,
--   description varchar not null
-- );
--
-- create unique index book_isbn_idx on book (title);

insert into todos (title, completed) values ('Hello, world!', false);
insert into todos (title, completed) values ('Clean room', false);