require("dotenv").config();
console.log('Server is active');
//Imports and constants
const express = require('express')
const app = express();
const port = 2468;
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const userData = path.join(__dirname, "data", "data.json");
const studySessionsData = path.join(__dirname, "data", "studySessions.json");
const studyGoalsData = path.join(__dirname, "data", "studyGoals.json");
const session = require('express-session');
const askGroq = require("./groqService");


app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
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
app.use("/StudyPilot", requireLogin);
app.use("/VirtualLab", requireLogin);
app.use("/AIChatbot", requireLogin);
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

app.post("/ask-ai", requireLogin, async (req, res) => {

    try {
        const { question } = req.body;

        // Validation goes HERE
        if (!question || question.trim().length === 0) {
            return res.status(400).json({
                message: "Please provide a question."
            });
        }

        if (question.length > 500) {
            return res.status(400).json({
                message: "Your question cannot exceed 500 characters."
            });
        }

        const answer = await askGroq(question);

        res.json({
            answer: answer
        });

    } catch (error) {

        console.error("Groq API error:", error);

        res.status(500).json({
            message: "Something went wrong while generating the answer."
        });

    }

});

app.post("/study-sessions", requireLogin, (req, res) => { 
    const sessions = JSON.parse(fs.readFileSync(studySessionsData, "utf-8"));

    const newSession = {
        id: Date.now(),
        username: req.session.user.username,
        subject: req.body.subject,
        topic: req.body.topic,
        date: req.body.date,
        time: req.body.time,
        duration: req.body.duration,
        completed: false
    };

    sessions.push(newSession);
    fs.writeFileSync(studySessionsData, JSON.stringify(sessions, null, 2));

    res.json({
        message: "Session saved successfully",
        session: newSession
    });
});

app.get("/study-sessions", requireLogin, (req, res) => {
    const sessions = JSON.parse(
        fs.readFileSync(studySessionsData, "utf-8")
    );
    const userSessions = sessions.filter(session => 
        session.username === req.session.user.username
    );
    res.json(userSessions);
});

app.patch("/study-sessions/:id/complete", requireLogin, (req, res) =>{
    const sessions = JSON.parse(
        fs.readFileSync(studySessionsData, "utf-8")
    );
    const session = sessions.find(item => item.id === Number(req.params.id));
    if (!session || session.username !== req.session.user.username) {
        return res.status(404).json({
            message: "Study session not found"
        })
    
    }
session.completed = true;
fs.writeFileSync(studySessionsData, JSON.stringify(sessions, null, 2), "utf-8");
res.json({
    message: "Study session completed", session
});
});

app.post("/study-goals", requireLogin, (req, res) => {
    const goals = JSON.parse(fs.readFileSync(studyGoalsData, "utf-8"));

    const newGoal = {
        id: Date.now(),
        username: req.session.user.username,
        name: req.body.name,
        subject: req.body.subject,
        description: req.body.description,
        target: Number(req.body.target),
        unit: req.body.unit,
        deadline: req.body.deadline,
        completed: false
    };

    goals.push(newGoal);
    fs.writeFileSync(studyGoalsData, JSON.stringify(goals, null, 2));

    res.json({
        message: "Goal saved successfully",
        goal: newGoal
    });
});

app.get("/study-goals", requireLogin, (req, res) => {
    const goals = JSON.parse(
        fs.readFileSync(studyGoalsData, "utf-8")
    );
    const userGoals = goals.filter(goal => 
        goal.username === req.session.user.username
    );
    res.json(userGoals);
});

app.patch("/study-goals/:id/complete", requireLogin, (req, res) =>{
    const goals = JSON.parse(
        fs.readFileSync(studyGoalsData ,"utf-8")
    );
    const goal = goals.find(item => item.id === Number(req.params.id));
    if (!goal || goal.username !== req.session.user.username) {
        return res.status(404).json({
            message: "Goal not found"
        })
    
    }
goal.completed = true;
fs.writeFileSync(studyGoalsData, JSON.stringify(goals, null, 2), "utf-8");
res.json({
    message: "Goal completed", goal
});
});
app.listen(port, "0.0.0.0", () => {
    console.log(`Server running at http://localhost:${port}`)
});