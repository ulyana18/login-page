const crypto = require('crypto');
const pool = require('../db/queries');
const jwt = require('jsonwebtoken');
// const config = require('../config');


class AuthService {
    constructor() {
        this.accessTokenSecret = process.env.ACCESS_TOKEN;
        // this.accessToken = config.accessToken;
    }

    async SignUp(name, email, password) {
        const passwordHashed = this.hashPassword(password);

        await pool.query('SELECT * FROM users WHERE email = $1', [email])
            .then(result =>{ 
                const isResultNotEmpty = result.rows.length !== 0;

                if (isResultNotEmpty) {
                    throw new Error;
                }
                pool.query('INSERT INTO users (email, password, name) VALUES ($1, $2, $3)',
                    [email, passwordHashed, name]
                );
            })
            .catch(function(err) {
                console.log('error is here');
                return new Error('This email is already in use!');
            });

        const accessToken = jwt.sign({ name, email }, this.accessTokenSecret);

        return {
            user: name,
            token: accessToken
        };
    }

    async LogIn(email, password) {
        let name;
        await pool.query('SELECT * FROM users WHERE email = $1', [email])
            .then(result => {
                const isResultNotEmpty = result.rows.length !== 0;
                const passwordHashed = this.hashPassword(password);
                const isPasswordNotRight = result.rows[0].password !== passwordHashed;

                if (isResultNotEmpty || isPasswordNotRight) {
                    throw new Error;
                }
                ({ name } = result.rows[0]);
            })
            .catch(function(err) {
                return new Error('Incorrect login or password!');
            });

        const accessToken = jwt.sign({ user: name, email }, this.accessTokenSecret);

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
