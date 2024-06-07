import mysql from "mysql2";
import bcrypt from "bcrypt";

const saltRounds = 10;

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'elective',
    timezone: 'Z'
}).promise()


const result = await pool.query("select * from student")

result[0].map(student => {
    let username = student.usn;
    let dob = student.dob.toISOString().split('T')[0]; 
    const sql = 'INSERT INTO login (username, password) VALUES (?, ?)';

    bcrypt.hash(dob, saltRounds, async (err, hash)=>{
        if(err){
            console.error("Error while hashing ", err);
        }else{
            await pool.query(sql, [username, hash], (err, res)=>{
                if(err){
                    console.error("An error while inserting")
                }else{
                    console.log("Value inserted sucessfully")
                }
            })
        }
    } )
    

})

export default pool;
