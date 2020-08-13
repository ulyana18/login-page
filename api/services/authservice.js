const crypto = require('crypto');
const pool = require('../db/queries');
const jwt = require('jsonwebtoken');

class AuthService {
    constructor() {
        this.accessTokenSecret = 'jdhhhhseddassbckdbsdkbehoa';
    }

    async SignUp(name, email, password) {
        const passwordHashed = this.hashPassword(password);

        await pool.query('SELECT * FROM users WHERE email = $1', [email])
            .then(result =>{ 
                if (result.rows.length !== 0) {
                    throw new Error;
                }
                pool.query('INSERT INTO users (email, password, name) VALUES ($1, $2, $3)',
                    [email, passwordHashed, name]
                );
            })
            .catch(function(err) {
                throw new Error;
            });

        const accessToken = jwt.sign({ name, email }, this.accessTokenSecret);

        return {
            user: name,
            token: accessToken
        };
    }

    async LogIn(email, password) {
        let user;
        await pool.query('SELECT * FROM users WHERE email = $1', [email])
            .then(result => {
                const passwordHashed = this.hashPassword(password);
                if (result.rows.length === 0 || result.rows[0].password !== passwordHashed) {
                    throw new Error;
                }
                user = { name: result.rows[0].name, email };
            })
            .catch(function(err) {
                return new Error;
            });

        const accessToken = jwt.sign({ user: user.name, email }, this.accessTokenSecret);

        return {
            user: user.name,
            token: accessToken
        };
    }

    hashPassword(password) {
        return crypto
            .createHash("sha256")
            .update(password)
            .digest('hex');
    }
}

module.exports = AuthService;