console.log('Server is active');
//Imports and constants
const express = require('express')
const app = express();
const port = 2468;
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const userData = path.join(__dirname, "data", "data.json");
const session = require('express-session')



app.use(express.json());

app.use(session({
    secret: "Afsjihsixhsishsixysbs",
    resave: false,
    saveUninitialized: false
}));

function requireLogin(req, res, next) {
    if (!req.session.user) {
        return res.redirect("/")
    }
    next();
};
app.use("/dashboard", requireLogin);
app.use("/SmartStudy", requireLogin);
app.use("/QuizBattle", requireLogin);
app.use("VirtualLab", requireLogin);
app.use(express.static(path.join(__dirname, "public")));





app.post("/signup", async (req, res) => {
    const newUser = req.body;
    const users = JSON.parse(fs.readFileSync(userData, "utf-8"));
    const exists = users.some(user => user.username === newUser.username);

    if(exists) {
        return res.status(409).json({
            message:"Username already exists"
        });
    };

newUser.password = await bcrypt.hash(newUser.password, 10);
users.push(newUser);

fs.writeFileSync(userData, JSON.stringify(users, null, 2));
res.json({message: "Signup sucessfull"});

});

app.post("/login", async (req, res) => {
 const { username, password } = req.body;
 const users = JSON.parse(fs.readFileSync(userData, "utf-8"));
 const user = users.find(u => u.username === username);
 
 if(!user) {
    return res.status(401).json({
        message: "Invalid username or password"
    });

 }
 
 const isMatch = await bcrypt.compare(password, user.password);
 if (!isMatch) {
    return res.status(401).json({
        message: "Invalid username or password"
    })
 }
 req.session.user = { username: user.username, name: user.name };
 res.json({
    message: "Login successfull",
    username: user.username,
    name: user.name
 });

 
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
});