const mongoose = require('mongoose')

let PostSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'users'
    },
    url:{
        type: String,
        required : true,
    },
    image:{
        type: String,
        required: false
    },
    title:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    },
    language:{
        type: String,
        required: false,
    },
    community: {
        type: String,
        required: true
    },
    comment_id: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'comment'
    }],
    likes: {
        type: Number
    },
    created_at:{
        type:Date,default:()=>Date.now()
    },
	modified_at:{
        type:Date,default:()=>Date.now()
    }
})

let Posts = mongoose.model("posts", PostSchema)
module.exports = Posts