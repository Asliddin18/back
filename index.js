var express = require('express');
var app = express();
var cors = require('cors')
const upload = require("express-fileupload")
const user = require('./router/User.js')
const fs = require("fs")
const test = require('./router/test.js')
const video = require('./router/video.js')
const jwt = require("jsonwebtoken")
const authenticateToken = require("./Auth")
app.use(upload())
var ACCESS_TOKEN_SECRET = "963d48d8a5bbe8acd67458646d5d469f45bfda4b75629e20944efa56a24d32201c16c005da46b2fd7f8867fbf589541e957f51bbe19b3a9c6dd1c3aa473bba7e"
app.use(express.static('./data'))
app.post("/login", (req, res) => {
    const operatorJson = JSON.parse(fs.readFileSync("./data/User.json"))
    let postToken = false
    const name = req.body.name
    const parol = req.body.parol

    const accesToken = jwt.sign(name, ACCESS_TOKEN_SECRET)

    operatorJson.map(item => {
        if (item.name === req.body.name && item.parol === req.body.parol) {
            postToken = true
        } 4
    })
    if (postToken === true) {
        res.status(200).send(accesToken)
    } else {
        res.status(400).send("parol or Username is Error")
    }
})
app.use('/user', user)
app.use('/test', test)
app.use('/video', video)

app.get('/boshla/:user',(req,res)=>{

})

app.options(cors());
app.listen(8000, function () {
    console.log('Listening to Port 8000');
});