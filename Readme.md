# Pool-me
We all have faced the tough times of going through callback hell created by using [MySQL](https://www.npmjs.com/package/mysql#install) as a database for your project. This package aims at solving it, by providing Promise Wrappers for MySQL Pools.

## Installation
Installation is done using npm install command:
```
$ npm install pool-me
```

## Introduction
We assume, if you are looking for something like this, either you have started developing your application already, or you are planning to refactor your code. For both these tasks, its a pretty huge deal to entirely shift over packages, and especially to the one's that provide a small subset of important methods of the original package, i.e [mysql](https://www.npmjs.com/package/mysql#install).
This is why, this package is aimed at simplicity. Just import the package, create your MySQL Pool using [mysql](https://www.npmjs.com/package/mysql#install) package, and pass it to this package. All the methods are exactly the same, just with the flavour of Async/Await. Even the warnings are same ;)

## Usage
This package relies heavily (entirely) on the [mysql package](https://www.npmjs.com/package/mysql#install).

Here is an example on how to use it:

``` javascript
var mysql = require('mysql')
var poolme = require('pool-me')

var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'me',
    password: 'secret',
    database: 'my_db'
})

var newpool = poolme(pool)
```

## Supported Methods
Currently the package supports some of the important methods required with Pools. The package is in active development stage, and will be updated with support for new methods supported by [mysql](https://www.npmjs.com/package/mysql#install) package.

### Pool Methods
Currently it supports the following pool methods:

#### getConnection
This is used to get a connection from the Pool. It is used to share the connection state for subsequent queries.
 ``` javascript
 let con = await newpool.getConnection()
 ```

#### end
After using the pool, all the connections should be closed at the SQL Server level. This method is used to gracefully shut down the server.
 ``` javascript
 await newpool.end()
 ```

### Connection Methods
Currently it supports the following connection methods:

#### query
After receiving a connection from the pool, that connection should be used to execute a query. 
``` javascript
let results = await con.query('SELECT something FROM sometable')
// OR
let results = await con.query('INSERT INTO sometable VALUES (?,?)', [value1, value2])
```

#### release
After executing the query or queries with the acquired connection, it should be returned back to the pool to be fetched again if required.
``` javascript
con.release()
```

## Example
And here we present you with a working example, to help you fast-forward with the relatively small documentation ;)
``` javascript
var mysql = require('mysql')
var poolme = require('pool-me')

var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'me',
    password: 'secret',
    database: 'my_db'
})

var newpool = poolme(pool)

FetchResults = async () => {
    let con = await newpool.getConnection()
    let results = await newpool.query('INSERT INTO creators VALUES (?, ?)', ['Sarthik', 'Gupta'])
    // Do something with results
    con.release()
    await newpool.end()
}

FetchResults()
```

## Contribution
The package is in its budding stage. Refer to the github repository for all the suggestions, pull-requests, issues, everything.