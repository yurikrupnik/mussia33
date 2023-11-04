create TABLE books (
    id serial primary key,
    title varchar not null,
    author varchar not null,
    description varchar not null
--     PRIMARY KEY (id)
);

create unique index book_isbn_idx on books (title);


insert into books (title, author, description) values ('Moby Dick', 'someone', 'my book');


CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
create TABLE users (
--     id uuid default gen_random_uuid() primary key,
    id uuid default uuid_generate_v4() primary key,
    username varchar not null unique,
    email varchar not null unique,
    password_hash varchar not null,
    full_name varchar null,
    bio varchar null,
    image varchar null,
    -- email_verified
    -- active
    created_at timestamp not null default current_timestamp,
    updated_at timestamp not null default current_timestamp
);

insert into users (
           username, email, password_hash, full_name, bio, image
) values (
          'Yuri', 'a@a.com', 'password', 'Yuri krupnik', 'some bio', 'https://cdn.britannica.com/45/5645-050-B9EC0205/head-treasure-flower-disk-flowers-inflorescence-ray.jpg'
         );