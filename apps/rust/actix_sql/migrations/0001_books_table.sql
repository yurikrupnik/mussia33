create TABLE books (
    id serial primary key,
    title varchar not null,
    author varchar not null,
    description varchar not null
--     PRIMARY KEY (id)
);

create unique index book_isbn_idx on books (title);


insert into books (title, author, description) values ('Moby Dick', 'someone', 'my book');