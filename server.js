var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');

var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 

var pool = mysql.createPool({
	host: 'task1db.c0wykvs8ujyc.us-east-1.rds.amazonaws.com',
    user: 'jklife3',
    password: // removed for security purpose
    database: 'tweet',
    port: '3306',
    debug: true
});

app.get('/', function(req, res) {
	res.render('index.jade', { title: 'index' , message: 'Input the username'});
	// res.json({ message: 'Welcome to tweet!'});
})

app.post('/showUserTweets', function(req, res) {
	var userName = req.body.userName;
	var userId;
	pool.getConnection(function(err, connection) {
	    connection.query("SELECT userId FROM userTable WHERE userName = ?", [userName], function(error, rows, fields) {
			if(!!error || rows.length != 1) {
				console.log(error);
				res.render('index.jade', { message: 'There seems to be an issue with the username that you entered'});
			} else {
				userId = rows[0].userId;
				connection.query("SELECT *, likes + replies + shares as totalScore FROM tweetTable WHERE userId = ? ORDER BY totalScore DESC LIMIT 10", [userId], function(error, rows, fields) {
					if(!!error || rows.length < 1) {
						console.log(error);
						res.render('index.jade', { message: 'This user has no tweets so far.'});
					} else {
						res.render('index.jade', { message: 'Tweets for' + userName, data: rows});
					}
				});
			}
		});
		connection.release();
	});
})

app.listen(4000);
