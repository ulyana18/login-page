const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const path = require('path');

const config = path.resolve('config');
const pool = path.resolve('db/queries');
const { SUCCESSFULL, ERROR } = path.resolve('additional-data/app-status');
const { LOGINERROR, SIGNUPERROR } = path.resolve('additional-data/user-messages');

class AuthService {
    constructor() {
        this.accessTokenSecret = config.accessToken;
    }

    signUp(name, email, password) {
        const passwordHashed = this.hashPassword(password);

        pool.query('SELECT * FROM users WHERE email = $1', [email])  // async await
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
                return new Error(SIGNUPERROR);
            });

        const accessToken = jwt.sign({ name, email }, this.accessTokenSecret);

        return {
            user: name,
            token: accessToken
        };
    }

    logIn(email, password) {
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
                return new Error(LOGINERROR);
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
