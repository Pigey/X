X
=

Universal model layer for browser apps based on websocket.

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

## client side (browser & Node.js)

[X-client](https://github.com/nighca/X-client)

### demo

* [X-weekly](https://github.com/nighca/X-weekly)

## API (client)

### model methods

[see code](https://github.com/nighca/X/blob/master/model/method.js)

* list

	`[ { filters... }, { fields... }, { options... }, callback(err, list) ]`

	get all matched instances

* get

	`[ { filters... }, { fields... }, { options... }, callback(err, item) ]`

	get one matched instance

* distinct

	`[ 'field', { filters... }, callback(err, list) ]`

	distinct operation

* create

	`[ { item... } / [ { item... }, .... ], callback(err, item...) ]`

	create (& save) one instance / instance array

* remove

	`[ { filters... }, callback(err, affectedNum) ]`

	remove all matched instances

* update

	`[ { filters... }, { updates... }, { options... }, callback(err, affectedNum) ]`

	update all matched instances

* on

	`[ event, callback() ]`

	listen to model events

### model events

* create

	`[ item... ]`

	item(s) created

* remove

	`[ affectedNum ]`

	item(s) removed

* update

	`[ affectedNum ]`

	item(s) updated

* change

	`[ { type: 'type', data: [] } ]`

	combination of `create`, `remove` & `update`

	`type`: one of `create`, `remove` & `update`

	`data`: `[ item... ]` / `[ affectedNum ]` ( depends on type )

### error types:

* `ILLEGAL TOKEN`

	validate token failed

* `SCHEMA REQUIRED`

	model scheme/struct required

* other mongoose or mongoDB error