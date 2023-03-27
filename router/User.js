const express = require('express')
const fs= require('fs')
const uuid=require("uuid")

const router = express.Router()

router.get("/",(req,res)=>{
    const TeacherData = JSON.parse(fs.readFileSync('./data/User.json', "utf-8"))
    res.status(200).send(TeacherData)
})
router.post('/',(req,res)=>{
    const UserData = JSON.parse(fs.readFileSync('./data/User.json', "utf-8"))
 
    console.log(req.body.name.length > 2, "ism");
    console.log(req.body.surname.length > 5, "fam");
    console.log(req.body.year*1 >= 18, "yosh");
    console.log(req.body.pasportnum.length == 9, "pasportnum");
    console.log(req.body.pasportser.length == 2, "pasportser");
    console.log(req.body.category >= 1, "toifa");
    console.log(req.body.parol.length > 8, "parol");
 
    if (req.body.name.length > 2 && req.body.surname.length > 5 && req.body.year*1 >= 18 && 
        req.body.pasportnum.length == 9 && req.body.pasportser.length == 2 && req.body.category.length >= 1 &&
        req.body.category.length < 3 && req.body.parol.length > 8){
var data={
    "id":uuid.v1(),
    "name": req.body.name,
    "surname":req.body.surname,
    "year": req.body.year*1,
    "pasportser": req.body.pasportser,
    "pasportnum": req.body.pasportnum,
    "pay":0,
    "access":false,
    "category":req.body.category,
    "parol":req.body.parol,
    "test":[],
    "testaccess":0,
    "result":[]
}
UserData.unshift(data)
fs.writeFileSync("./data/User.json", JSON.stringify(UserData,0,2) ,"utf-8" )
res.status(200).send(data)
}else{
    res.status(500).send("malumot yetarli emas")
}
})
router.delete('/:id',(req,res)=>{
var id=req.params.id
const User = JSON.parse(fs.readFileSync('./data/User.json', "utf-8"))
var kluch=-1
User.map((item,key)=>{
    if(item.id==id){
        kluch=key
    }
})
if(kluch>-1){
User.splice(kluch,1)
    fs.writeFileSync("./data/User.json", JSON.stringify(User, 0, 2), "utf-8")
    res.status(200).send("o`chirildi")
}else{
    res.status(500).send("Id mos kelmadi")
}


})

router.put('/:id', (req, res) => {
    var id = req.params.id
    const User = JSON.parse(fs.readFileSync('./data/User.json', "utf-8"))
    var kluch = -1
    User.map((item, key) => {
        if (item.id == id) {
            kluch = key
        }
    })
    if (kluch > -1) {

        User[kluch].name = req.body.name?(req.body.name):(User[kluch].name)
        User[kluch].surname = req.body.surname?(req.body.surname) : (User[kluch].surname)
        User[kluch].year = req.body.year * 1 ? (req.body.year) : (User[kluch].year * 1)
        User[kluch].pasportser = req.body.pasportser ? (req.body.pasportser) : (User[kluch].pasportser)
        User[kluch].pasportnum = req.body.pasportnum ? (req.body.pasportnum) : (User[kluch].pasportnum)
        User[kluch].pay = 0 ? (req.body.pay) : (User[kluch].pay)
        User[kluch].access = false ? (req.body.access) : (User[kluch].access)
        User[kluch].category = req.body.category ? (req.body.category) : (User[kluch].category)
        User[kluch].parol = req.body.parol ? (req.body.parol) : (User[kluch].parol)
        User[kluch].test = [] ? (req.body.test) : (User[kluch].test)
        User[kluch].testaccess = 0 ? (req.body.testaccess) : (User[kluch].testaccess)
        User[kluch].result = [] ? (req.body.result) : (User[kluch].result)

        
        fs.writeFileSync("./data/User.json", JSON.stringify(User, 0, 2), "utf-8")
        res.status(200).send(User[kluch])
    } else {
        res.status(500).send("Id mos kelmadi")
    }


})
module.exports=router
