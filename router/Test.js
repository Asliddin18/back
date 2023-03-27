const express = require('express')
const fs = require('fs')
const uuid = require("uuid")
const Math=require('mathjs')
const router = express.Router()

router.get("/", (req, res) => {
    const TeacherData = JSON.parse(fs.readFileSync('./data/test.json', "utf-8"))
    res.status(200).send(TeacherData)
})
router.post('/', (req, res) => {
    const UserData = JSON.parse(fs.readFileSync('./data/test.json', "utf-8"))


    if (req.body.variant > 0 &&req.body.category.length >= 1 &&
        req.body.category.length < 3 && req.body.savol.length > 0 && req.body.javob.length > 0 &&  req.body.variant1.length > 0 && req.body.variant2.length > 0 &&  req.body.variant3.length > 0 && req.body.variant4.length > 0) {
        var data = {
            "id": uuid.v1(),
            "variant": req.body.variant*1,
            "category": req.body.category,
            "savol": req.body.savol,
            "javob": req.body.javob*1,
            "variant1": req.body.variant1,
            "variant2": req.body.variant2,
            "variant3": req.body.variant3,
            "variant4": req.body.variant4,
            
        }
        UserData.unshift(data)
        fs.writeFileSync("./data/test.json", JSON.stringify(UserData, 0, 2), "utf-8")
        res.status(200).send(data)
    } else {
        res.status(500).send("malumot yetarli emas")
    }
})
router.delete('/:id', (req, res) => {
    var id = req.params.id
    const User = JSON.parse(fs.readFileSync('./data/test.json', "utf-8"))
    var kluch = -1
    User.map((item, key) => {
        if (item.id == id) {
            kluch = key
        }
    })
    if (kluch > -1) {
        User[kluch].variant = req.body.variant ? req.body.variant : User[kluch].variant,
        User[kluch].category = req.body.category ? req.body.category : User[kluch].category,
        User[kluch].savol = req.body.savol ? req.body.savol : User[kluch].savol,
        User[kluch].javob = req.body.javob ? req.body.javob : User[kluch].javob,
        User[kluch].variant1 = req.body.variant1 ? req.body.variant1 :User[kluch].variant1,
        User[kluch].variant2 = req.body.variant2 ? req.body.variant2:User[kluch].variant2,
        User[kluch].variant3 = req.body.variant3 ? req.body.variant3 : User[kluch].variant3,
        User[kluch].variant4 = req.body.variant4 ? req.body.variant4 : User[kluch].variant4,
        fs.writeFileSync("./data/test.json", JSON.stringify(User, 0, 2), "utf-8")
        res.status(200).send(User[kluch])
    } else {
        res.status(500).send("Id mos kelmadi")
    }


})
router.post('/start/:id',(req,res)=>{
    const User = JSON.parse(fs.readFileSync('./data/User.json', "utf-8"))
    const Test = JSON.parse(fs.readFileSync('./data/test.json', "utf-8"))
var kluch=-1
User.map((item,key)=>{
    if (item.id == req.params.id && item.testaccess>0){
 kluch=key
    }
})
 function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
if(kluch<0){
    res.status(500).send("siz yuborgan id topilmadi yoki test bajarishga ruxsat yoq")
}else{
var variand1=[]
for (let i = 0; i < Test.length; i++) {
var push=true
   for (let j = 0;j<variand1.length; j++) {
  if(Test[i].variant==variand1[j]){
push=false}
}
if(push)
{
    variand1.push(Test[i].variant)
}}
var testVariand=getRandomInt(variand1.length)
console.log(variand1)

var allTest=[]
Test.map(item=>{
    if(item.variant==variand1[testVariand]){
        allTest.push(item)
    }
})
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hour = date.getHours()
    let minut = date.getMinutes();
    let currentDate =`${day}-${month}-${year}-${hour}-${minut}`;
    let currentDate2 = `${day}-${month}-${year}-${(minut+allTest.length)>60?hour+1:hour}-${(minut+allTest.length)>60?(minut-60+allTest.length):minut+allTest.length}`;
var data={
    "id":uuid.v1(),
    "startDay":currentDate,
    "finish":currentDate2,
    "variand":variand1[testVariand],
    "result":0
}
User[kluch].testaccess--
User[kluch].result.push(data)
fs.writeFileSync("./data/User.json", JSON.stringify(User, 0, 2), "utf-8")
res.status(200).send(allTest)
}
})
router.post('/natija/:id',(req,res)=>{
var data=req.body.data;
const test=JSON.parse(fs.readFileSync('./data/test.json', "utf-8"))
const User=JSON.parse(fs.readFileSync('./data/User.json', "utf-8"))
var prosent
for (let i = 0; i < User.length; i++) {
if(User[i].id==req.params.id){
    
}


}

})




module.exports = router
