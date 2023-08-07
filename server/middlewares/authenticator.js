const jwt = require("jsonwebtoken");

require("dotenv").config()

const accessToken = process.env.ACCESS_TOKEN_SECRET;


function authenticator(req, res, next) {
    const token = req.headers.authorization
    jwt.verify(token, accessToken, (err, decode) => {
        if (err) {
            return res.send({
                message: err.message,
                status: 2
            })
        }
        if (decode) {
            req.body.user = decode.userId
            next()
        } else {
            res.send({
                message: "token is not valid please login",
                status: 2
            })
        }

    })
}

module.exports = {
    authenticator,
}