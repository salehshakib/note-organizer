const express = require("express");
const { NoteModel } = require("../models/NoteModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { authenticator } = require("../middlewares/authenticator")

require("dotenv").config()

const noteRouter = express.Router();
noteRouter.use(authenticator);


noteRouter.get("/", (req, res) => {
    res.send({
        message: "all the notes are here",
        status: 1
    })
})









module.exports = {
    noteRouter,
}