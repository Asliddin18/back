const express = require('express')
const fs = require('fs')
const uuid = require("uuid")

const router = express.Router()

router.get("/", (req, res) => {
    const TeacherData = JSON.parse(fs.readFileSync('./data/video.json', "utf-8"))
    res.status(200).send(TeacherData)
})
router.get("/user/:id", (req, res) => {
    const TeacherData = JSON.parse(fs.readFileSync('./data/video.json', "utf-8"))
    var token=false
var category    
    TeacherData.map(item=>{
        if (item.access==true && item.id==req.params.id){
token=true  
category=item.category
        }
    })
    var sendData=[]
    TeacherData.map(item=>{
        if(item.category==category){
sendData.push(item)
        }
    })
    
    if(token){
  res.status(200).send(sendData)
}else{
        var ss=[]
for (let i=0;i<3;i++) {
    ss.push(sendData[i])
}
        res.status(200).send(ss)}
})
router.post('/', (req, res) => {
    const UserData = JSON.parse(fs.readFileSync('./data/video.json', "utf-8"))
    
    if (req.body.link.length > 1 && req.body.category.length >= 1 &&
        req.body.category.length < 3 && req.body.dars.length > 1) {
        var data = {
            "id": uuid.v1(),
            "link": req.body.link.replace("watch?", "embed/"),
            "category": req.body.category,
            "dars": req.body.dars,
        }
        UserData.unshift(data)
        fs.writeFileSync("./data/video.json", JSON.stringify(UserData, 0, 2), "utf-8")
        res.status(200).send(data)
    } else {
        res.status(500).send("malumot yetarli emas")
    }
})
router.delete('/:id', (req, res) => {
    var id = req.params.id
    const User = JSON.parse(fs.readFileSync('./data/video.json', "utf-8"))
    var kluch = -1
    User.map((item, key) => {
        if (item.id == id) {
            kluch = key
        }
    })
    if (kluch > -1) {
        User.splice(kluch, 1)
        fs.writeFileSync("./data/video.json", JSON.stringify(User, 0, 2), "utf-8")
        res.status(200).send("o`chirildi")
    } else {
        res.status(500).send("Id mos kelmadi")
    }


})
router.put('/:id', (req, res) => {
    var id = req.params.id
    const User = JSON.parse(fs.readFileSync('./data/video.json', "utf-8"))
    var kluch = -1
    User.map((item, key) => {
        if (item.id == id) {
            kluch = key
        }
    })
    if (kluch > -1) {
        User[kluch].link = req.body.link ? req.body.link.replace("watch?", "embed/") : User[kluch].link,
            User[kluch].category = req.body.category ? req.body.category : User[kluch].category,
            User[kluch].dars = req.body.dars ? req.body.dars : User[kluch].dars,
        fs.writeFileSync("./data/video.json", JSON.stringify(User, 0, 2), "utf-8")
        res.status(200).send(User[kluch])
    } else {
        res.status(500).send("Id mos kelmadi")
    }


})


module.exports = router
