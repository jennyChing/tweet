var express = require('express');
var bodyParser = require('body-parser');
var twit = require('twitter'),
	client = new twit({
		consumer_key:'consumer_key',
		consumer_secret:'consumer_secret',
		access_token_key:'access_token_key',
		access_token_secret:'access_token_secret'
	});

var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 

app.get('/', function(req, res) {
	res.render('index.jade', { title: 'index' , message: 'Input the username'});
	// res.json({ message: 'Welcome to tweet!'});
})

app.post('/showUserTweets', function(req, res) {
	var userName = req.body.userName;
	var params = {screen_name: userName}; // count:
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (!error) {
			var data = [];
			var score = 
			console.log(tweets);
			for (var i = 0; i < tweets.length ; i++) {
				console.log(i + tweets[i].retweeted);
				if (tweets[i].text.startsWith('RT @') == false){
					score = tweets[i].retweet_count + tweets[i].favorite_count;
					data.push({text: tweets[i].text, favorite_count: tweets[i].favorite_count, retweet_count: tweets[i].retweet_count, score: score, created_at: tweets[i].created_at});
				};
			}
			data.sort(function(a, b){ 
				return b.score - a.score;
			});
			res.render('index.jade', { message: 'Top ten tweets for ' + userName, data: data.slice(0, 10)});
		}
	});
})

app.listen(4000);
