const express = require("express");
const { NoteModel } = require("../models/NoteModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { authenticator } = require("../middlewares/authenticator")

require("dotenv").config()

const noteRouter = express.Router();
noteRouter.use(authenticator);


noteRouter.get("/", async (req, res) => {
    try {
        let data = await NoteModel.find({ user: req.body.user })
        res.send({
            data: data,
            message: "success",
            status: 1
        })
    } catch (error) {
        res.send({
            message: error.message,
            status: 0
        })
    }


    // F
})


noteRouter.post('/create', async (req, res) => {

    try {
        let note = new NoteModel(req.body)
        await note.save()
        res.send({
            message: "note created",
            status: 1
        })
    } catch (error) {
        res.send({
            message: error.message,
            status: 0
        })
    }
})

// delete the note

// noteRouter.delete('/delete', async (req, res) => {

//     res.send({
//         message:req.body.user
//     })
// })









module.exports = {
    noteRouter,
}