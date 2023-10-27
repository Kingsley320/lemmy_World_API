const express = require('express')
const mongoose = require('mongoose')

const app = express()
const path = require('path')
require('dotenv').config()

let users = require('./routes/users')
let posts = require('./routes/post')
let comments = require('./routes/comment')
let community = require('./routes/community')
let like = require('./routes/like')

const cors = require('cors')
app.use(
    cors({
        origin:'*'
    })
)

app.use(express.json())
app.use(express.urlencoded({extended: true}))

let PORT = process.env.PORT
let CONNECTION = process.env.ONLINE_CON

mongoose.connect(CONNECTION, {useNewUrlParser:true, useUnifiedTopology:true})
mongoose.connection.on('open', ()=> console.log('Mongodb is Up'))
mongoose.connection.on('error', (e) => {console.log(e)})

app.use('/api/v1', users);
app.use('/api/v1', posts);
app.use('/api/v1', comments);
app.use('/api/v1', like);
// app.use('/api/v1', community);


// multer package. Uses path to concat date plus file name
const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './Images')
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage})

// Handle images
// app.post('/create-post', upload.single("image"), async (req,res) =>{
//     try {
//         res.send("Image Uploaded")
//     } catch (error) {
//         console.log(error)
//     }
// })






// comment
app.post('/feed/:id/comments', async (req,res) => {
    try {
        // let comment = new CommentModel(req.body)
        // await comment.save()
        
    } catch (error) {
        console.log(error)
    }
})

// test case
// app.post('/create-finance', async function(req,res){
//     try{

//         let finance = new FinanceModel(req.body)
//         await finance.save()

//         res.send(finance)
//     }
//     catch(err){
//         res.send(err.message)
//     }
// })

app.listen(PORT)
console.log(`App running on port ${PORT}`)
