const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    post_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'posts',

    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'users',
    },
    date_created: {type: Date, default:()=> Date.now()},
    date_modified: {type:Date, default:()=>Date.now()}
})

const Likes = mongoose.model('like', likeSchema)
module.exports = Likes