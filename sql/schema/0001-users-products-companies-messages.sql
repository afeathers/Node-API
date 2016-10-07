CREATE TABLE users
(
    uid serial NOT NULL PRIMARY KEY,
    username varchar(225),
    password varchar(225),
    first varchar(225),
    last varchar(225),
    comp varchar(225)[],
    type varchar(225),
    ava text,
    website varchar(225),
    inter varchar(225)[],
    watch varchar(225)[]
);

CREATE TABLE products
(
    pid serial NOT NULL PRIMARY KEY,
    owner varchar(225),
    title varchar(225),
    video varchar(225),
    web varchar(225),
    short text,
    long text,
    pat varchar(225)[],
    feat text,
    images varchar(225)[],
    indu varchar(225)[],
    tags varchar(225)[]

);

CREATE TABLE companies
(
    cid serial NOT NULL PRIMARY KEY,
    user varchar(225),
    name varchar(225),
    descr text,
    feat text,
    reps varchar(225)[],
    deals varchar(225)[]
);

CREATE TABLE messages
(
    mid serial NOT NULL PRIMARY KEY,
    owners varchar(225)[],
    content varchar(225),
    ts timestamp(0) DEFAULT now()
);

CREATE TABLE deals
(
	did serial NOT NULL PRIMARY KEY,
	client_id varchar(225),
	host_id varchar(225),
	status varchar(225),
	notes text,
	ts timestamp(0) DEFAULT now()
);

CREATE TABLE userHistory
(
	uHid serial NOT NULL PRIMARY KEY,
	user_id varchar(225),
	watchitems varchar(225)[],
	timediff1 varchar(225)[]
);