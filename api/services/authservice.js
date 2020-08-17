const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const path = require('path');

const config = path.resolve('../config');
const pool = path.resolve('../db/queries');
const status = path.resolve('/additional-data/user-messages');

class AuthService {
    constructor() {
        this.accessTokenSecret = config.accessToken;
    }

    SignUp(name, email, password) {
        const passwordHashed = this.hashPassword(password);

        pool.query('SELECT * FROM users WHERE email = $1', [email])
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
                return new Error(status.signupError);
            });

        const accessToken = jwt.sign({ name, email }, this.accessTokenSecret);

        return {
            user: name,
            token: accessToken
        };
    }

    LogIn(email, password) {
        let name;
        pool.query('SELECT * FROM users WHERE email = $1', [email])
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
                return new Error(status.loginError);
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
