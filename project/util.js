const fs = require('fs');

function getData(){
    try{
        return [
            JSON.parse(fs.readFileSync('./database/student.json','utf-8',(err, data) => console.log(err))),
            JSON.parse(fs.readFileSync('./database/score.json','utf-8',(err, data) => console.log(err)))
        ]

    }catch(err){
        throw new Error("Malumotlar bazasida Hatolik bor !!!")
    }
}

function setData(students, score){
    try{
    
        students && fs.writeFileSync('./database/student.json', JSON.stringify(students, null, 4)),
        score && fs.writeFileSync('./database/score.json', JSON.stringify(score, null, 4))
    

    }catch(err){
        throw new Error("Malumotlar bazasida Hatolik bor !!!")
    }
    
}
function getTime(){
    let currentdate = new Date();
    let datetime = currentdate.getDay() + "/" + currentdate.getMonth() 
    + "/" + currentdate.getFullYear() + " " 
    + currentdate.getHours() + ":" 
    + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    return datetime
}

module.exports = {getData, setData, getTime}


