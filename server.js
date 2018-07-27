const express = require("express");
const bcrypt = require("bcrypt")
const bodyParser = require("body-parser");
const app = express();
const Database = require('better-sqlite3');
const db = new Database('./db.sqlite3');
const saltRounds = 10;

function uniqueUsername(username) {
	users = db.prepare("SELECT * FROM User").all();
	for (user in users) {
		if (users[user].username === username) {
			console.log(`${users[user].username} === ${username}`);
			return false;
		} else {
			console.log(`${users[user].username} !== ${username}`);
		}
	};
	return true;
};

db.prepare("CREATE TABLE IF NOT EXISTS User ( \
			id INTEGER PRIMARY KEY,\
			name TEXT,\
			username TEXT UNIQUE,\
			password TEXT\
	);").run();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("", function(req, res){
		res.render("pages/login",{
				foods:["dsa","dsa","DSAA"]
			});
	});

app.post("", function(req,res){

	});

app.get("/register", function(req,res){
		res.render("pages/register",{error:""});
	});

app.post("/register", function(req,res){
		var name = req.body.name;
		var username = req.body.username;
		var password = req.body.password;
		if (uniqueUsername(username)){
			bcrypt.hash(password, saltRounds, function(err, hash) {
	  				db.prepare(`INSERT INTO User (name,username,password) VALUES ('${name}','${username}','${hash}');`).run();
				});
			res.redirect("/");
		} else {
			res.render("pages/register",{error:"Username is already taken."});
		}
		res.end();
	});

app.listen(8000);
//		db.prepare(`INSERT INTO User (name,username,password) VALUES (${name},${username},${password});`).run();
