const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');
const ejs = require('ejs');
const app = express();
const PORT = 3000;


app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'ejs');

const con = mysql.createConnection({
  host: "localhost",
  port: "8889",
  user: "todo",
  password: "todo_password",
  database: "todo_app",
});

app.get("/", (req, res) => {
  const sql = "select * from tasklist";
  con.query(sql,(err,result)=> {
    if(err) throw err;
    res.render("index",{tasklist:result});
  });
});

app.post("/add", (req, res) => {
  const sql = `insert into tasklist (task, checkbox) values("${req.body.task}", 0)`;
  con.query(sql,(err,result) => {
    if(err) throw err;
    res.redirect("/");
  });
});

app.get("/edit/:id",(req,res) => {
  const sql = `select * from tasklist where id = "${req.params.id}"`;
  con.query(sql,(err,result) => {
    if(err) throw err;
    res.render("edit",{task: result});
  });
});

app.post("/update/:id",(req, res) => {
  const sql = `update tasklist set task = "${req.body.task}" where id = "${req.params.id}"`;
  con.query(sql,(err) => {
    if(err) throw err;
    res.redirect("/");
  });
});



app.get("/delete/:id",(req, res) => {
  const sql = `delete from tasklist where id = "${req.params.id}"`;
  con.query(sql, (err, result) => {
    if(err) throw err;
    res.redirect("/");
  });
});


app.listen(PORT, ()=> {
  console.log(`running server on localhost:${PORT}`);
});