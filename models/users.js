const mongoose = require('mongoose')

let usersSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        unique: false
    },
    post_id: [{type: mongoose.Schema.Types.ObjectId, ref: 'posts'}],
    like_id: [{type: mongoose.Schema.Types.ObjectId, ref: 'like'}],
    created_at:{
        type:Date,default:()=>Date.now()
    },
	modified_at:{
        type:Date,default:()=>Date.now()
    }
})

let Users = mongoose.model('users', usersSchema)
module.exports = Users