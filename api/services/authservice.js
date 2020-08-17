const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const path = require('path');

const config = path.resolve('config');
const pool = path.resolve('db/queries');
const { LOGINERROR, SIGNUPERROR } = path.resolve('additional-data/user-messages');

class AuthService {
    constructor() {
        this.accessTokenSecret = config.accessToken;
    }

    async signUp(name, email, password) {
        const passwordHashed = this.hashPassword(password);

        try {
            const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
            const isResultNotEmpty = result.rows.length !== 0;

            if (isResultNotEmpty) {
                throw new Error;
            }
            pool.query('INSERT INTO users (email, password, name) VALUES ($1, $2, $3)',
                [email, passwordHashed, name]
            );
        } catch(err) {
            return new Error(SIGNUPERROR);
        }

        const accessToken = jwt.sign({ name, email }, this.accessTokenSecret);

        return {
            user: name,
            token: accessToken
        };
    }

    logIn(email, password) {
        let name;
        try {
            const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

            const isResultNotEmpty = result.rows.length !== 0;
            const passwordHashed = this.hashPassword(password);
            const isPasswordNotRight = result.rows[0].password !== passwordHashed;

            if (isResultNotEmpty || isPasswordNotRight) {
                throw new Error;
            }
            ({ name } = result.rows[0]);

        } catch(err) {
            return new Error(LOGINERROR);
        }

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
