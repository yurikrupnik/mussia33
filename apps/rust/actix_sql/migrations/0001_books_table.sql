create TABLE book (
    title varchar not null,
    author varchar not null,
    description varchar not null
--     PRIMARY KEY (id)
);

create unique index book_isbn_idx on book (title);
