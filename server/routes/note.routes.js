const express = require("express");
const { NoteModel } = require("../models/NoteModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { authenticator } = require("../middlewares/authenticator")

require("dotenv").config()

const noteRouter = express.Router();
noteRouter.use(authenticator);


// get all the note 

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

})

// create a note

noteRouter.post('/create', async (req, res) => {

    try {
        const note = new NoteModel(req.body)
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

// update note

noteRouter.patch('/', async (req, res) => {
    const { id } = req.headers
    try {
        await NoteModel.findByIdAndUpdate({ _id: id }, req.body)
        res.send({
            message: "note updated",
            status: 1
        })
    } catch (error) {
        res.send({
            message: error.message,
            // id: req.headers,
            status: 0
        })
    }
})

// delete the note

noteRouter.delete('/', async (req, res) => {
    const id = req.headers
    try {
        await NoteModel.findByIdAndDelete({ _id: id })
        res.send({
            message: "note deleted",
            status: 1
        })
    } catch (error) {
        res.send({
            message: error.message,
            status: 0
        })
    }
})








module.exports = {
    noteRouter,
}