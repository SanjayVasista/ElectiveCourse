import mysql from "mysql2";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    timezone: 'Z'
}).promise();

const saltRounds = 10;

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
