class SQLpool {

	constructor(pool)  {
		this.con = null
		this.pool = pool
	}

	getConnection() {
		return new Promise ((resolve, reject) => {
			this.pool.getConnection((err, con) => {
				if(err) {
					return reject(err)
				} else {
					resolve(new SQLcon(con))
				}
			})
		})
	}

	getDetails() {
		console.log(`Total Connections: ${this.pool.config.connectionLimit}`)
		console.log(`Free Connections: ${this.pool._freeConnections.length}`)
		console.log(`In-use Connections: ${this.pool._allConnections.length}`)
		console.log(`In-process Connections: ${this.pool._acquiringConnections.length}`)
	}
}


class SQLcon {

	constructor(con) {
		this.con = con
	}

	query(content, args = null) {
		return new Promise ((resolve, reject) => {
			if (args) {
				this.con.query(content, args, (err, res) => {
					if (err) {
						return reject(err)
					} else {
						resolve(res)
					}
				})
			} else {
				this.con.query(content, (err, res) => {
					if (err) {
						return reject(err)
					} else {
						resolve(res)
					}
				})
			}
		})
	}

	release() {
		return this.con.release()
	}
}


poolMe = (pool) => {
	return new SQLpool(pool)
}

module.exports = poolMe