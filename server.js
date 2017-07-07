var express = require('express');
var bodyParser = require('body-parser');
var twit = require('twitter'),
	client = new twit({
		consumer_key:'lQCnX0y6UlDruC38ShhJhbfU5',
		consumer_secret:'5Rs2dY8fz1RTPNOnxxWbMFAq7bh0TZyG2qrGLF6pHuit091vT4',
		access_token_key:'2354050566-b021r62sNCJBgHCRiX7Co8cAZHmlgeO5BvOuSgs',
		access_token_secret:'4xfA8BrAzEhRLZn6Uw9r0s0Kqu2FAeQ7194yNjvFNbiXz'
	});

var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 

<<<<<<< HEAD
=======
var pool = mysql.createPool({
	host: 'task1db.c0wykvs8ujyc.us-east-1.rds.amazonaws.com',
    user: 'jklife3',
    password: // removed for security purpose
    database: 'tweet',
    port: '3306',
    debug: true
});

>>>>>>> 0c861f04fc34129710168893e6eb358b25aaa31d
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
