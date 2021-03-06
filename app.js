const express = require('express'),
    app = express(),
    mongoose = require("mongoose"),
   
    passport = require("passport"),
    bodyParser = require("body-parser"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    User = require("./models/user"),
    TodoTask = require("./models/TodoTask"),
    dotenv = require('dotenv');
dotenv.config();
mongoose.connect("mongodb+srv://test:12345@notedo.0fxvt.mongodb.net/?retryWrites=true", { useNewUrlParser: true }, () => {
  console.log("Connected to db!");

});
app.use(require("express-session")({
    secret: "Any normal Word",       //decode or encode session
    resave: false,
    saveUninitialized: false
}));


app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded(
    { extended: true }
))
app.use(passport.initialize());
app.use(passport.session());

//=======================
//      R O U T E S
//=======================

app.get("/", (req, res) => {
    res.render("login");
})


//Auth Routes
app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/login", passport.authenticate("local", {
    successRedirect: "/userprofile",
    failureRedirect: "/login"
}), function (req, res) {

});

app.get("/register", (req, res) => {
    res.render("register");
});

app.post("/register", (req, res) => {

    User.register(new User({ username: req.body.username, phone: req.body.phone, telephone: req.body.telephone }), req.body.password, function (err, user) {
        if (err) {
            
            console.log(err);
            res.render("register");
        }
        passport.authenticate("local")(req, res, function () {
            res.redirect("/login");
        })
    })
})

app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}
// GET METHOD todo
app.get("/userprofile", isLoggedIn, (req, res) => {
    TodoTask.find({"owner": req.user.id }, (err, tasks) => {
        res.render("userprofile.ejs", {
            username: req.user.username,
             todoTasks: tasks
            });
    });
});
//Post method todo
app.post('/userprofile',isLoggedIn, async (req, res) => {
    const todoTask = new TodoTask({
        owner: req.user.id,
        content: req.body.content
    });
    try {
        await todoTask.save();
        res.redirect("/userprofile");
    } catch (err) {
        res.redirect("/userprofile");
    }
});
//UPDATE todo
app.route("/edit/:id").get( isLoggedIn,(req, res) => {
    const id = req.params.id; TodoTask.find({"owner": req.user.id}, (err, tasks) => {
        res.render("todoEdit.ejs", { username: req.user.username,todoTasks: tasks, idTask: id });
    });
}).post((req, res) => {
    const id = req.params.id; TodoTask.findByIdAndUpdate(id, {
        content: req.body.content
    }, err => { if (err) return res.send(500, err); res.redirect("/userprofile"); });
});
//DELETE method todo
app.route("/remove/:id").get( isLoggedIn,(req, res) => {
    const id = req.params.id; TodoTask.findByIdAndRemove(id, err => {
        if (err) return res.send(500, err);
        res.redirect("/userprofile");
    });
});


//Listen On Server


app.listen(process.env.PORT || 3000, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Server Started At Port 3000");
    }

});
passport.serializeUser(User.serializeUser());       //session encoding
passport.deserializeUser(User.deserializeUser());   //session decoding
passport.use(new LocalStrategy(User.authenticate()));