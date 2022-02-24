let [,,method, id, score, comment] = process.argv
const fs = require('fs')

const {getData, setData, getTime} = require('./util.js')


if(method == "POST" && id && score){
    let [students, scores] = getData()

    let s = students.find((el) => el.studentId == id) || null
    let scoreId = scores.find((el) => el.studentId == scores.at(-1).scoreId + 1) || scores.at(-1).scoreId + 1
    if(s && !isNaN(+score)){
        scores.push({
            scoreId,
            studentId: s.studentId,
            score: +score,
            time: getTime(),
            comment: comment ? comment : "no comment"
        })
    }
    setData(null, scores)
    console.log("Score added Successfully")

}else if(method == "PUT" && id && score){
    let [students, scores] = getData()
    let s = scores.find((el) => el.scoreId == id) || null
    if(s && !isNaN(+score)){
        s.score = +score
    }
    setData(null, scores)
    console.log("Score updated")
}else if(method == "DELETE" && id){
    let [students, scores] = getData()
    let filtered = scores.filter((el) => el.scoreId != id)
    setData(null, filtered)
    console.log("Score deleted")
}else{
    console.log(`Unknown method ${method}`)
}