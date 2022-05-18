const express = require("express");
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const TodoTask = require("./models/TodoTask");
const bodyParser = require("body-parser");
const passport = require("passport")
const db = require("./configs/database");
dotenv.config();
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
    console.log("Connected to db!");
});
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', require('./routes/auth'));

//connection to db
//mongoose.set("useFindAndModify", false);

/*mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
    console.log("Connected to db!");
    app.listen(3000, () => console.log("Server Up and running"));
});*/

app.set("view engine", "ejs");
// loade from database 
app.get('/', (req, res) => {
    TodoTask.find({ "owner": "test" }, (err, tasks) => {
        //fix till imr gör användare och filterara genom det .
        //db.movies.find( { "directors": "Christopher Nolan" } );
        res.render("todo.ejs", { todoTasks: tasks });
    });
});

// add to TODO to database
app.post('/', async (req, res) => {
    const todoTask = new TodoTask({

        owner: "test",
        content: req.body.content
    });
    try {
        await todoTask.save();

        res.redirect("/");
    } catch (err) {
        res.redirect("/");
    }
});

// make changes in Todo
app
    .route("/edit/:id")
    .get((req, res) => {
        const id = req.params.id;
        TodoTask.find({}, (err, tasks) => {
            res.render("todoEdit.ejs", { todoTasks: tasks, idTask: id });
        });
    })
    .post((req, res) => {
        const id = req.params.id;
        TodoTask.findByIdAndUpdate(id, { content: req.body.content }, err => {
            if (err) return res.send(500, err);
            res.redirect("/");
        });
    });

//Delete from database
app.route("/remove/:id").get((req, res) => {
    const id = req.params.id;
    TodoTask.findByIdAndRemove(id, err => {
        if (err) return res.send(500, err);
        res.redirect("/");
    });
});
// functions for persistant sessions
passport.serializeUser(function (user_id, done) { done(null, user_id); });
passport.deserializeUser(function (user_id, done) { done(null, user_id); });

app.listen(process.env.PORT || 3000, function () {
    console.log("listening on port 3000!");
});