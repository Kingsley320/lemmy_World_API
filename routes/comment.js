const express = require('express')
const app = express.Router()
const Comment = require('../models/comment')

app.get('/comment', async (req,res) => {
    try{
        const comments = await Comment.find()
        res.send(comments)
    }catch (error){
        res.status(500).json({msg: error.message}).send()
    }
})


module.exports = app