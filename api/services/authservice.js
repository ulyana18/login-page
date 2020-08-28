const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const path = require('path');

const config = require('config');
const pool = require('db/queries');
const { LOGIN_ERROR, SIGNUP_ERROR, TOKEN_ERROR } = require('messages/userMessages');
const { TOKEN_LIFE_TIME } = require('messages/consts');


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
                throw new Error(SIGNUP_ERROR);
            }

            pool.query('INSERT INTO users (email, password, name) VALUES ($1, $2, $3)',
                [email, passwordHashed, name]
            );


        } catch(err) {
            throw new Error(SIGNUP_ERROR);
        }

        const accessToken = jwt.sign({ name, email }, "" + this.accessTokenSecret, { expiresIn: TOKEN_LIFE_TIME});
        const refreshToken = jwt.sign({ name, email }, "" + this.refreshTokenSecret);

        const response = {
            user: name,
            email,
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

        const accessToken = jwt.sign({ name, email }, this.accessTokenSecret, { expiresIn: TOKEN_LIFE_TIME});
        const refreshToken = jwt.sign({ name, email }, this.refreshTokenSecret);

        const response = {
           user: name,
           email,
           token: accessToken,
           refreshToken,
        }

        this.tokenList[refreshToken] = response;

        return response;
    }

    checkToken(refreshToken, name, email) {
        let accessToken;

        if (!refreshToken) {
            throw new Error(TOKEN_ERROR);
        }
    
        if (!this.tokenList.hasOwnProperty(refreshToken)) {
            throw new Error(TOKEN_ERROR);        
        }

        jwt.verify(refreshToken, this.refreshTokenSecret, (err, user) => {
            if (err) {
                throw new Error(TOKEN_ERROR);
            }

            accessToken = jwt.sign({ name, email }, this.accessTokenSecret, { expiresIn: TOKEN_LIFE_TIME});
        });
        return accessToken;
    }

    hashPassword(password) {
        return crypto
            .createHash("sha256")
            .update(password)
            .digest('hex');
    }
}

module.exports = new AuthService();
