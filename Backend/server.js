const express = require('express');
var bodyParser = require('body-parser');
var firebase = require("firebase");
var jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 5000;

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var config = {
    apiKey: "AIzaSyBfkeTA-3ivv_EUOi6vTj5UP4530moiec4",
    authDomain: "instyle-5f93a.firebaseapp.com",
    databaseURL: "https://instyle-5f93a.firebaseio.com",
    projectId: "instyle-5f93a",
    storageBucket: "instyle-5f93a.appspot.com",
    messagingSenderId: "620412495745"
  };
  
firebase.initializeApp(config);

// create a GET route
app.get('*', (req, res) => {
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

app.post('/auth', urlencodedParser, function (req, res) {
   // Prepare output in JSON format
   const promise = firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password)
	.then(function(firebaseUser) {
		var jwtToken = jwt.sign({
			uid: firebaseUser.user.uid
		}, 'secret', { expiresIn: '1h' });
		response = {
			isAuth: true,
			token: jwtToken
		};
		res.end(JSON.stringify(response));
	})
	.catch(function(error) {
		response = {
			isAuth: false,
			message: error.message
		};
		res.end(JSON.stringify(response));
		});
})

app.post('/test', urlencodedParser, function (req, res) {
	console.log(req.body);
	jwt.verify(req.body.token, 'secret', function(err, decoded) {
		if(err != null){
			response = {
				message: 'failed'
			};
		}
		else{
			response = {
				message: 'successful'
			};
		}
		res.end(JSON.stringify(response));
	});
})

app.post('/register', urlencodedParser, function (req, res) {
   // Prepare output in JSON format
   const promise = firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password)
	.then(function(firebaseUser) {
		response = {
			isAuth: true,
			uid: firebaseUser.user.uid
		};
		res.end(JSON.stringify(response));
	})
	.catch(function(error) {
		response = {
			isAuth: false,
			message: error.message
		};
		res.end(JSON.stringify(response));
		});
})

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
