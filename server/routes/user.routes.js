const express = require("express");
const { UserModel } = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config()

const accessToken = process.env.ACCESS_TOKEN_SECRET;

const userRouter = express.Router()

userRouter.get('/', (req, res) => {
    res.send({
        message: "all the user are here"
    })
})


userRouter.post("/register", async (req, res) => {
    const { name, email, password } = req.body
    bcrypt.hash(password, 7, async function (err, hash) {
        // Store hash in your password DB.
        if (err) {
            return res.send({
                message: "Something went wrong on", status: 404

            })
        }
        try {
            let data = await UserModel.find({ email });
            if (data.length > 0) {
                res.send({
                    message: "user already exists",
                })
            }
            else {
                let user = new UserModel({ name, email, password: hash })
                await user.save()
                // console.log(user);
                res.send({
                    message: "User created",
                    status: 1
                })
            }
        }
        catch (error) {
            res.send({
                message: error.message,
                status: 0
            })
        }

    });

})

userRouter.post('/login', async (req, res) => {
    const { email, password } = req.body

    //it stores the time for expiration time
    // let option = {
    //     expiresIn: "3m"
    // }

    try {
        let data = await UserModel.find({ email })
        if (data.length > 0) {
            let token = jwt.sign({
                userId: data[0]._id
            }, accessToken)
            // }, accessToken, option) 
            // add option here
            bcrypt.compare(password, data[0].password, function (err, result) {
                if (err) res.send({
                    message: "something went wrong " + err,
                    status: 0
                })
                if (result) {
                    res.send({
                        message: "user logged in successfully",
                        token: token,
                        status: 1
                    })
                } else {

                }
            });
        }
        else {
            res.send({
                message: "user doesnt exists",
                status: 0
            })
        }
    } catch (error) {
        res.send({
            message: error.message,
            status: 0
        })
    }


})


module.exports = {
    userRouter,
}