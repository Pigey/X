X
=

Universal model layer for browser apps.

A nodejs project.

RPC realization with [dnode](https://github.com/substack/dnode) & [shoe](https://github.com/substack/shoe)

Storage based on [mongoDB](http://www.mongodb.org/) & [mongoose](http://mongoosejs.com/)

## Usage

1. mongoDB service required

2. config

	* config/db.json (mongoDB info)

	``` javascript
	{
		"domain": "127.0.0.1",			// db service address
		"port": "8082",					// db service port
		"user": "",						// db service username
		"password": "",					// db service password
		"db": "X"						// db name
	}
	```

	* config/server.json (server config)

	``` javascript
	{
		"port": 8083,					// server listen port
		"path": "/X"					// websocket path
	}
	```

3. install dependencies

		npm install

4. start server

		node server.js

5. gen token

	* gen token pair (accessToken & secretToken)

			bin/genToken

	* gen new accessToken (secretToken required)

			bin/genAccess <secretToken>

## client side (browser)

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