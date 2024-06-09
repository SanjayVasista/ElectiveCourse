import express from "express";
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy } from "passport-local";
import session from "express-session";
import mysql from "mysql2";
import path from "path";
import flash from "express-flash";

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'elective',
    timezone: 'Z'
}).promise()

const app = express();
const port = 3000;

app.use(
    session({
        secret: "TOPSECRETWORD",
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 5,
        }
    })
);
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');
//static file path
app.use(express.static("public"))

async function getSemRegisterList(sem) {
    let [details] = await pool.query(`select * from sem${sem};`);
    return details;
}

app.get('/', async (req, res) => {
    res.render("login");
})


app.post('/login', passport.authenticate("local", {
    successRedirect: '/branchSelection',
    failureRedirect: '/',
})
)


app.post('/faculty', async (req, res) => {
    const oddSem = ["1st Semester", "3rd Semester", "5th Semester", "7th Semester"];
    const evenSem = ["2nd Semester", "4th Semester", "6th Semester"]
    let username = req.body.username;
    let password = req.body.password;
    let cred = await pool.query("select * from admin where username = ?", [username]);
    let passDb = cred[0][0].password.toISOString().split('T')[0]
    if (passDb === password) {
        res.render('dashboardHome', {
            oddSem: oddSem,
            evenSem: evenSem,
            currentSem: courses[0],
            currentSemCourses: courses[1]
        })
    } else {
        res.redirect('/')
    }

})

app.get('/branchSelection', async (req, res) => {
    if (req.isAuthenticated()) {
        const { username } = req.user;
        const [details] = await pool.query(`SELECT * FROM details WHERE usn = ?`, [username]);
        if (details.length > 0) {
            let sem = "sem"+ details[0].sem
            const [subDetails] = await pool.query(`SELECT * FROM ${sem} WHERE courseCode = ?`, [details[0].courseCode]);
            res.redirect('/subDisplay');
        } else {
            res.render('branchSelection');
        }
    } else {
        res.redirect('/');
    }
})

app.post('/branch', async (req, res) => {
    if (req.isAuthenticated()) {
        let dbBranch = req.user.username.substr(5, 2);
        let selectBranch = req.body.branch;
        let semester = req.body.sem;
        (async () => {
            try {
                let selSem = await getSemRegisterList(semester);
                if (dbBranch === selectBranch) {
                    res.render('subjectSelection', {
                        subjects: selSem,
                    })
                }
            } catch (err) {
                console.error("Error fetching course list:", err);
            }
        })();
    }
})

app.get('/subjectSelection', async (req, res) => {
    if (req.isAuthenticated()) {
        (async () => {
            try {
                let selSem = await getSemRegisterList(semester);
                res.render('subjectSelection', {
                    subjects: selSem,
                })
            } catch (err) {
                console.error("Error fetching course list:", err);
            }
        })();
    }
})

app.post('/courseRegister', async (req, res) => {
    if (req.isAuthenticated()) {
        let selSubCode = req.body.course;
        let subTitle = "";
        let usn = req.user.username;
        (async () => {
            try {

                for (let i = 1; i <= 7; i++) {
                    let [details] = await pool.query(`select registration from sem${i} where courseCode = ?;`, [selSubCode]);
                    if (details.length > 0) {
                        let curReg = ++details[0].registration;
                        await pool.query(`update sem${i} set registration = ? where courseCode = ?;`, [curReg, selSubCode]);
                        await pool.query(`insert into details values(?,?,?)`, [usn, selSubCode, i]);
                    }
                } 
                for (let i = 1; i <= 7; i++) {
                    let [details] = await pool.query(`select courseTitle from sem${i} where courseCode = ?;`, [selSubCode]);
                    if (details.length > 0) {
                        subTitle = details[0].courseTitle;
                    }
                }
                res.render('subDisplay', {
                    subjectName: subTitle,
                    subjectCode: selSubCode
                })
            } catch (err) {
                console.error("Error fetching course list:", err);
            }
        })();
    }

})

app.get('/subDisplay', async (req, res) => {
    if (req.isAuthenticated()) {
        const { username } = req.user;
        const [details] = await pool.query(`SELECT * FROM details WHERE usn = ?`, [username]);
        if (details.length > 0) {
            let sem = "sem"+ details[0].sem
            const [subDetails] = await pool.query(`SELECT * FROM ${sem} WHERE courseCode = ?`, [details[0].courseCode]);
        res.render('subDisplay', {
            subjectName: subDetails[0].courseTitle,
            subjectCode: subDetails[0].courseCode
        })
    }
}})




app.post('/dash', (req, res) => {
    const selectedSemester = req.body.selectedSemester;
    courses[0] = selectedSemester;
    let sem = courses[0].substring(0, 1);
    (async () => {
        try {
            courses[1] = await getSemRegisterList(sem);
        } catch (err) {
            console.error("Error fetching course list:", err);
        }
    })();
    res.redirect('dashboard')
});

app.get('/dashboard', async (req, res) => {
    const oddSem = ["1st Semester", "3rd Semester", "5th Semester", "7th Semester"];
    const evenSem = ["2nd Semester", "4th Semester", "6th Semester"]
    res.render('dashboardHome', {
        oddSem: oddSem,
        evenSem: evenSem,
        currentSem: courses[0],
        currentSemCourses: courses[1]
    })
})


let currentSem = "1st Semester";
let currentList = [];

async function getSemCourseList(sem) {
    let [details] = await pool.query(`select * from sem${sem};`);
    return details;
}

let courses = [currentSem, currentList]


app.post('/sem', (req, res) => {
    const selectedSemester = req.body.selectedSemester;
    courses[0] = selectedSemester;
    let sem = courses[0].substring(0, 1);
    (async () => {
        try {
            courses[1] = await getSemCourseList(sem);
        } catch (err) {
            console.error("Error fetching course list:", err);
        }
    })();
    res.redirect(302, 'creation')
});


app.get('/creation', async (req, res) => {
    const oddSem = ["1st Semester", "3rd Semester", "5th Semester", "7th Semester"];
    const evenSem = ["2nd Semester", "4th Semester", "6th Semester"]
    let sem = courses[0].substring(0, 1);
    (async () => {
        try {
            courses[1] = await getSemCourseList(sem);
        } catch (err) {
            console.error("Error fetching course list:", err);
        }
    })();
    res.render('dashboardCreation', {
        oddSem: oddSem,
        evenSem: evenSem,
        currentSem: courses[0],
        currentSemCourses: courses[1]
    })
})

// Submission of Forms
for (let i = 1; i <= 7; i++) {
    app.post(`/${i}`, async (req, res) => {
        console.log(req.body.courseTitle, req.body.courseCode, req.body.limit)
        try {
            await pool.query(`insert into sem${i} values(?, ?, ?, ?)`, [
                req.body.courseTitle, req.body.courseCode, req.body.limit, 0
            ]
            );
            res.redirect(302, 'creation')

        } catch (err) {
            console.error("Error while inserting")
        }

    })
}



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