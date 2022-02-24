let [,,method, arg, arg1] = process.argv

const fs = require('fs')

const {getData, setData} = require('./util.js')

if(method == "GET" && arg){

    let [students, score] = getData()

    let element = students.find((el) => {
        return el.name == arg
    })

    if(element){
        let filtered = score.filter((el) => {
            return el.studentId == element.studentId
        })
        let array = []
        for(let {scoreId, score, time, comment} of filtered){
            array.push({scoreId, score, time, comment})
        }
        
        console.table(array)
    }else{
        console.log("> Afsuski bu talaba topilmadi?")
    }

}else if(method == "GET"){

    let [students, score] = getData()

    students.map((el) => {
        let sum = 0
        for(let i of score){
            if(el.studentId == i.studentId){
                sum += i.score
            }
        }
        el.totalScore = sum
    })
    students.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
    });


    console.table(students)

}else if(method == "POST" && arg){

    let [students, score] = getData()

    let filtered = students.filter((el) => el.name == arg)
    
    if(filtered.length){
        console.log(arg + " is already exsists")
    }else{
        students.push({
            studentId: students.at(-1).studentId + 1,
            name: arg
        })
        setData(students)
        console.log("Student added Successfully")
    }
}else if(method == "PUT" && arg && arg1){
    
    let [students, score] = getData()
    
    let element = students.find((el) => {
        return el.studentId == arg
    })
    if(element){
        element.name = arg1
        setData(students)
        console.log("Student updated Successfully")
    }else{
        console.log("> Afsuski bu talaba topilmadi?")
    }

}else if(method == "DELETE" && arg){
            
    let [students, score] = getData()

    let element = students.find((el) => {
        return el.studentId == arg
    })
    if(element){
        students.splice(students.indexOf(element), 1)
        setData(students)
        console.log("Deleted Successfully")
    }else{
        console.log("> Afsuski bu talaba topilmadi?")
    }


}else{
    console.log(`Unknown method ${method}`)
}