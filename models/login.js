import mysql from "mysql2"

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '1234',
    database: 'elective',
}).promise()

// async function value(){
    const result = await pool.query("select * from student")
    console.log(result)
    result[0].map( student =>{
        console.log(student.usn)
        console.log(student.dob.toISOString().split('T')[0])
    })
//     return result;
// }

// console.log(value())