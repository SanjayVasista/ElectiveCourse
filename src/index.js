import express from "express";
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy } from "passport-local";
import session from "express-session";
import mysql from "mysql2";

const pool = mysql.createPool({
    host: 'sql12.freesqldatabase.com',
    user: 'sql12707946',
    password: 'pNL8YVacQh',
    database: 'sql12707946',
    timezone: 'Z'
}).promise()

const app = express();
const port = 3000;

app.use(
    session({
        secret: "TOPSECRETWORD",
        resave: false,
        saveUninitialized: true,
        cookie:{
            maxAge: 1000 * 60 * 5,
        }
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');
//static file path
app.use(express.static("public"))

app.get('/', async (req, res) => {
    res.render("login");
})

app.post('/login', passport.authenticate("local", {
    successRedirect: "/branchSelection",
    failureRedirect: "/",
})
)

app.get('/branchSelection', async (req, res) => {
    if (req.isAuthenticated()) {
        res.render('branchSelection');
    } else {
        res.redirect('/');
    }
})

app.post('/branch', async (req, res)=>{
    if(req.isAuthenticated()){
        let dbBranch = req.user.username.substr(5,2); 
        let selectBranch = req.body.branch;
        let semester = req.body.sem;
        
        if(dbBranch === selectBranch){
            res.render('subjectSelection')
        }
    }
    
})

app.get('/subjectSelection', async (req, res) => {
    res.render('subjectSelection')
})

app.get('/subDisplay', async (req, res) => {
    res.render('subDisplay')
})

app.get('/dashboard', async (req, res) => {
    res.render('dashboardHome')
})

app.get('/creation', async (req, res) => {
    res.render('dashboardCreation')
})

passport.use(
    new Strategy(async function verify(username, password, cb) {
        try {
            const result = await pool.query("SELECT * FROM login WHERE username = ? ", [
                username,
            ]);
            if (result[0].length > 0) {
                const user = result[0][0];
                const storedHashedPassword = user.password;
                bcrypt.compare(password, storedHashedPassword, (err, valid) => {
                    if (err) {
                        //Error with password check
                        console.error("Error comparing passwords:", err);
                        return cb(err);
                    } else {
                        if (valid) {
                            //Passed password check
                            return cb(null, user);
                        } else {
                            //Did not pass password check
                            return cb(null, false);
                        }
                    }
                });

            } else {
                return cb("User not found");
            }
        } catch (err) {
            console.log(err);
        }
    })
);

passport.serializeUser((user, cb) => {
    cb(null, user);
});
passport.deserializeUser((user, cb) => {
    cb(null, user);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})