class SQLpool {

	constructor(pool)  {
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

	end() {
		return new Promise ((resolve, reject) => {
			this.pool.end((err) => {
				if (err) {
					return reject(err)
				} else {
					resolve()
				}
			})
		})
	}

	freeConnections() {
		return this.pool._freeConnections.length
	}

	totalConnections() {
		return this.pool.config.connectionLimit
	}

	usedConnections() {
		return this.pool._allConnections.length
	}

	processedConnections() {
		return this.pool._acquiringConnections.length
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


poolme = (pool) => {
	return new SQLpool(pool)
}

module.exports = poolme