const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    body: {
        type: String
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'users'
    },
    created_at: {
        type: Date, default:()=> Date.now()
    },
    modified_at: {
        type: Date, default:()=> Date.now()
    }
})

const Comment = mongoose.model('comment', commentSchema)
module.exports = Comment