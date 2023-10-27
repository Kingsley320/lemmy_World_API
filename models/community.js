const mongoose = require('mongoose')

let communitySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    display_name: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    },
    banner: {
        type: String,
        required: true
    },
    sidebar: {
        type: String,
        required: false
    },
    nsfw: {
        type: Boolean,
        required: true
    },
    only_mods_post: {
        type: Boolean,
        required: false
    },
    creator_id: {
        type: mongoose.Schema.Types.ObjectId, ref:'users'
    },
    created_at: {
        type:Date, default:() => {Date.now()}
    },
    modified_at: {
        type: Date, default:()=> {Date.now()}
    }
})