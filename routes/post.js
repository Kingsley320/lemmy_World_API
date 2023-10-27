const express = require('express');
const app = express.Router()
const post = require('../models/posts')
const user = require('../models/users')
const comment = require('../models/comment')
const community = require('../models/community')

app.post('/create-post', async (req,res) => {
    try {
        let {user_id} = req.body;
        let author = await user.findById(user_id)
        if (!author) return res.status(404).send({msg:"user does not exist"})

        // let samePost = await post.findOne({
        //     user_id : user_id
        // }).populate("user_id")
        // if(samePost) return res.send({msg:"Post already created", samePost})

        let aPost = new post(req.body)
        await aPost.save()

        author.post_id.push(aPost._id)  
        await author.save()

        res.send(aPost)
    } catch (e) {
        res.status(500).send(e.message)
    }
})

app.get('/feed', async (req,res) => {
    try {
        let feed = await post.find().populate('user_id comment_id')
        .sort({created_at: -1})
        if (feed){
            res.send(feed)
        }
        else{
            res.json("Error getting feed")
        }
    } catch (error) {
        console.log(error)
    }
})

app.get('/feed/:id', async (req,res) => {
    try {
        let aPost = await post.findById({
            _id : req.params.id.substring(1)
        }).populate("user_id comment_id" )
        .populate({
            path: 'comment_id',
            populate: {
              path: 'user_id',
              model: 'users',
            },
          })
        if (aPost){
            res.send(aPost)
        }
        else{
            res.json("Error getting post")
        }
    } catch (error) {
        console.log(error)
    }
})

app.delete('/feed/:id', async (req,res) => {
    try{
        const {id} = req.params;
        console.log(id)
        let aPost = await post.findById(id )
        if(!aPost) return res.status(500).json({msg: "post does not exist"})
        aPost.deleteOne() 
        res.send('Deleted post')
        
    }catch(error){
        res.send(error.message)
    }
})

app.post('/feed/:id/comment', async (req,res) => {
    try {
        const {id} = req.params;
        const aPost = await post.findById({_id : req.params.id.substring(1)})
        
        const aComment = new comment(req.body);
        await aComment.save()

        aPost.comment_id.push(aComment._id)
        await aPost.save()

        res.send(aComment)
    } catch (error) {
        res.status(500).json({msg: error.message}).send()
    }

})

// app.get('/feed/:id/comment', async (req,res) => {
//     try{
//         const aPost = await post.findById({_id : req.params.id.substring(1)})
//         .populate("comment_id user_id")
//         .sort({created_at: -1})
//         const comments = aPost.comment_id
//         console.log(comments)
//         res.json(comments)
    
//     }
//     catch(error){
//         res.status(500).json({msg: error.message}).send()
//     }
// })

module.exports = app