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
var db = firebase.firestore();

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
		db.collection('users').doc(firebaseUser.user.uid).get().then(doc => {
			if (!doc.exists) {
				response = {
					isAuth: false,
					message: 'missing user info'
				};
			} else {
				response = {
					isAuth: true,
					token: jwtToken,
					uid: firebaseUser.user.uid,
					user_name: doc.data().user_name,
					first_name: doc.data().first_name,
					last_name: doc.data().last_name
				};
			}
			res.end(JSON.stringify(response));
		})
	})
	.catch(function(error) {
		response = {
			isAuth: false,
			message: error.message
		};
		res.end(JSON.stringify(response));
		});
})

app.post('/register', urlencodedParser, function (req, res) {
   if(req.body.user_name != null && req.body.first_name != null && req.body.last_name != null){
	   const promise = firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password)
		.then(function(firebaseUser) {
			var data = {
				email: firebaseUser.user.email,
				user_name: req.body.user_name,
				first_name: req.body.first_name,
				last_name: req.body.last_name
			};
			db.collection('users').doc(firebaseUser.user.uid).set(data).then(function(){
				response = {
					success: true,
					uid: firebaseUser.user.uid
				};
				res.end(JSON.stringify(response));
			}).catch(function(error) {
				response = {
					success: false,
					message: error.message
				};
				res.end(JSON.stringify(response));
			});
		})
		.catch(function(error) {
			response = {
				success: false,
				message: error.message
			};
			res.end(JSON.stringify(response));
			});
   }
   else{
		response = {
				success: false,
				message: 'Info incomplete'
			};
		res.end(JSON.stringify(response));
   }
})

app.post('/getUserInfo', urlencodedParser, function (req, res) {
	jwt.verify(req.body.token, 'secret', function(err, decoded) {
		if(err != null){
			response = {
				success: false,
				message: err.message
			};
			res.end(JSON.stringify(response));
		}
		else{
			db.collection('users').doc(decoded.uid).get().then(doc => {
				if (!doc.exists) {
					response = {
						success: false,
						message: 'missing user info'
					};
				} else {
					response = {
						success: true,
						uid: doc.id,
						email: doc.data().email,
						user_name: doc.data().user_name,
						first_name: doc.data().first_name,
						last_name: doc.data().last_name
					};
				}
				res.end(JSON.stringify(response));
			})
		}
	});
})

app.post('/addPosting', urlencodedParser, function (req, res) {
	jwt.verify(req.body.token, 'secret', function(err, decoded) {
		if(err != null){
			response = {
				success: false,
				message: err.message
			};
			res.end(JSON.stringify(response));
		}
		else{
			var data = {
				uid: decoded.uid,
				product_name: req.body.product_name,
				price: req.body.price,
				description: req.body.description
			};
			db.collection('posting').doc().set(data).then(function(){
				response = {
					success: true
				};
				res.end(JSON.stringify(response));
			}).catch(function(error) {
				response = {
					success: false,
					message: error.message
				};
				res.end(JSON.stringify(response));
			});
		}
	});
})

app.post('/searchPosting', urlencodedParser, function (req, res) {
	jwt.verify(req.body.token, 'secret', function(err, decoded) {
		if(err != null){
			response = {
				success: false,
				message: err.message
			};
			res.end(JSON.stringify(response));
		}
		else{
			db.collection('posting').where('product_name','==',req.body.product_name).get().then(snapshot => {
				if (snapshot.empty) {
					response = {
						success: false,
						message: 'no info found'
					};
				} else {
					result = [];
					snapshot.forEach(doc => {
					  result.push(doc.data());
					});
					response = {
						success: true,
						data: result
					};
				}
				res.end(JSON.stringify(response));
			}).catch(function(error) {
				response = {
					success: false,
					message: error.message
				};
				res.end(JSON.stringify(response));
			});
		}
	});
})

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;