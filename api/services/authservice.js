const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const path = require('path');

// const config = require(path.resolve('config.js'));
// const pool = require(path.resolve('db/queries.js'));
// const { LOGIN_ERROR, SIGNUP_ERROR } = require(path.resolve('additional-data/user-messages.js'));

const config = require('../config');
const pool = require('../db/queries');
const { LOGIN_ERROR, SIGNUP_ERROR } = require('../additional-data/user-messages');


class AuthService {
    constructor() {
        this.accessTokenSecret = config.accessToken;
        this.refreshTokenSecret = config.refreshToken;
        this.tokenList = {};
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
            throw new Error(SIGNUP_ERROR);
        }

        const accessToken = jwt.sign({ name, email }, "" + this.accessTokenSecret, { expiresIn: 3600});
        const refreshToken = jwt.sign({ name, email }, "" + this.refreshTokenSecret);

        const response = {
            user: name,
            token: accessToken,
            refreshToken,
        }

        this.tokenList[refreshToken] = response;
        return response;
 
    }

    async logIn(email, password) {
        let name;
        try {
            const result = await pool.query('SELECT * FROM users WHERE email = $1', [email])
            const isResultEmpty = result.rows.length === 0;
            const passwordHashed = this.hashPassword(password);
            const isPasswordNotRight = result.rows[0].password !== passwordHashed;

            if (isResultEmpty || isPasswordNotRight) {
                throw new Error;
            }
            ({ name } = result.rows[0]);
        } catch(err) {
            throw new Error(LOGIN_ERROR);
        }

        const accessToken = jwt.sign({ name, email }, this.accessTokenSecret, { expiresIn: 3600});
        const refreshToken = jwt.sign({ name, email }, this.refreshTokenSecret);

        const response = {
           user: name,
           token: accessToken,
           refreshToken,
        }

        this.tokenList[refreshToken] = response;

        return response;
    }

    hashPassword(password) {
        return crypto
            .createHash("sha256")
            .update(password)
            .digest('hex');
    }
}

module.exports = AuthService;
