const express = require("express");
const path = require("path");
const multer = require("multer");
const session = require("express-session");
require("dotenv").config();

const app = express();
const PORT = 3000;

// DATABASES CONNECTION
const {connect_Db_register} = require("./config/create_account");
connect_Db_register();

// multer setup
app.use("/uploads", express.static("uploads"));

// Serve public folder
app.use(express.static(path.join(__dirname,"public")));

// USE NEWER VERSION
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// SESSION SETUP FOR USER

app.use(session({
    secret:"super_secret_key",
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:1000*60*60
    }
}));

// SESSION SETUP FOR ADMIN
app.use("/admin",session({
  name: "adminSession",
  secret: process.env.ADMIN_SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true }
}));

// MIDDLEWARE Use these for see which route is being hit
app.use((req, res, next) => {
    console.log("➡️ Incoming:", req.method, req.url);
    next();
});

// HOME ROUTES THE VERY FIRST PAGE

app.get("/", (req,res)=> {
    res.sendFile(path.join(__dirname, "public","html", "homepage.html"));
});

// GOES TO SUBMISSION
app.get("/submit", (req,res)=> {
    res.sendFile(path.join(__dirname,"public", "html", "submit.html"))
});

// GOES TO HOMEPAGE
app.get("/homepage", (req,res)=>{
    res.sendFile(path.join(__dirname,"public", "html", "homepage.html"))
});

// Goes to trending
app.get("/trending", (req,res)=> {
    res.sendFile(path.join(__dirname,"public", "html", "trending.html"))
});

// Goes to hotnews
app.get("/hotnews", (req,res)=> {
    res.sendFile(path.join(__dirname,"public", "html", "hotnews.html"))
});

// Goes to support
app.get("/support", (req,res)=> {
    res.sendFile(path.join(__dirname,"public", "html", "supportus.html"))
});
// Goes to feedback
app.get("/feedback", (req,res)=> {
    res.sendFile(path.join(__dirname,"public", "html", "feedback.html"))
});

// Handle submission
app.use("/api", require("./routes/submit-gunaso"));

// Handle Fetching from Database for the explore trending gunaso
app.use("/", require("./routes/submit-gunaso"));


// GOES TO SIGNUP
app.get("/signup", (req,res)=> {
    res.sendFile(path.join(__dirname,"public", "html", "signup.html"))
});

// SIGNS UP
app.use("/", require("./routes/register-account"));

// Login page
app.use("/login", (req,res)=> {
    res.sendFile(path.join(__dirname, "public", "html", "login.html"))
});

// Login verify
app.use("/", require("./routes/login_verify"));

// Specific gunaso test
app.get("/gunaso/:id", (req,res)=> {
    console.log("Requested Gunaso ID:", req.params.id);
    res.sendFile(path.join(__dirname, "public", "html", "detail_gunaso.html"))
});

// COMMENTS
app.use("/", require("./routes/comment"));

// LIKE
app.use("/", require("./routes/like"));

app.get("/admin", (req,res)=> {
    res.sendFile(path.join(__dirname, "public", "html", "admin_login.html"))
});

// Serve dashboard
app.get("/admin/dashboard", require("./routes/admin_login").isAdmin, (req,res)=>{
    res.sendFile(path.join(__dirname, "public", "html", "admin_dashboard.html"))
});

// Use router for login/logout
app.use("/admin", require("./routes/admin_login"));

app.listen(PORT, ()=>{
    console.log(`Server running at http://localhost:${PORT}`);
});