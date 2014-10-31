X
=

Universal model layer for browser apps written with nodejs.

RPC realization with [dnode](https://github.com/substack/dnode) & [shoe](https://github.com/substack/shoe)

Storage based on [mongoDB](http://www.mongodb.org/) & [mongoose](http://mongoosejs.com/)

## Usage

1. mongoDB service required

2. config

	* config/db.json (mongoDB info)

		* domain

			db service address ( 'a.b.com', '127.0.0.1', ... )

		* port

			db service port (8082)

		* user

			db service username

		* password

			db service password

		* db

			db name

	* config/server.json (server config)

		* port

			server listen port (8083)

		* path

			websocket path ('/X')

3. install dependencies

		npm install

4. start server

		node server.js

5. gen token

	* gen token pair (accessToken & secretToken)

			bin/genToken

	* gen new accessToken (secretToken required)

			bin/genAccess <secretToken>

## Javascript SDK:

[X-client](https://github.com/nighca/X-client)

## API (client)

### model methods

* list

	`[ { filters... }, callback(err, list) ]`

* get

	`[ { filters... }, callback(err, obj) ]`

* create

	`[ { key: val, ... }, callback(err, obj) ]`

* remove

	`[ { filters... }, callback(err, affectedNum) ]`

* update

	`[ { filters: { filters...}, update: { key: val, ... } }, callback(err, affectedNum) ]`

* exec

	`[ { methd: 'method', args: [ args... ] }, callback(err, result) ]`

### field types

* `String`

	[Javascript] global.String

* `Number`

	[Javascript] global.Number

* `Boolean`

	[Javascript] global.Boolean

* `Array`

	[Javascript] global.Array

* `Date`

	[Javascript] global.Date

* `ObjectId`

	[Mongoose] Schema.Types.ObjectId

* `Mixed`

	[Mongoose] Schema.Types.Mixed


### error types:

* `ILLEGAL TOKEN`

	validate token failed

* `SCHEMA REQUIRED`

	model scheme/struct required

* other mongoose or mongoDB error