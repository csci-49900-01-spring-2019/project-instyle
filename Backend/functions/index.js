const functions = require('firebase-functions');
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

app.get('/userInfo', function (req, res) {
	let token = req.headers['x-access-token'] || req.headers['authorization'];
	if (token.startsWith('Bearer ')) {
		token = token.slice(7, token.length);
	}
	if(token){
		jwt.verify(token, 'secret', function(err, decoded) {
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
	} else {
		response = {
			success: false,
			message: 'missing token'
		};
		res.end(JSON.stringify(response));
	}
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
			var sss = req.body.size;
			var data = {
				uid: decoded.uid,
				product_name: req.body.product_name,
				price: req.body.price,
				size: req.body.size,
				brand: req.body.brand,
				gender: req.body.gender,
				category: req.body.category,
				description: req.body.description,
				tags: 
				{
					['name_' + req.body.product_name.toLowerCase()]: true,
					['brand_' + req.body.brand.toLowerCase()]: true
				}
			};
			db.collection('posting').add(data).then(function(docRef){
				response = {
					success: true,
					id: docRef.id
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

app.get('/posting',  function (req, res) {
	var ref = db.collection('posting');
	
	const p_uid = req.query.uid;
	const p_name = req.query.product_name;
	const p_gender = req.query.gender;
	const p_size = req.query.size;
	const p_brand = req.query.brand;
	const p_category = req.query.category;
	const p_price_ceiling = req.query.price_ceiling;
	const p_price_floor = req.query.price_floor;
	const p_result_limit = req.query.result_limit;
	if(p_uid != null)
	{
		ref = ref.where('uid','==',p_uid);
	}
	if(p_name!= null)
	{
		ref = ref.where('tags.name_' + p_name.toLowerCase(),'==',true);
	}
	if(p_gender != null)
	{
		ref = ref.where('gender','==',p_gender);
	}
	if(p_size != null)
	{
		ref = ref.where('size','==',p_size);
	}
	if(p_brand != null)
	{
		ref = ref.where('tags.brand_' + p_brand.toLowerCase(),'==',true);
	}
	if(p_category != null)
	{
		ref = ref.where('category','==',p_category);
	}
	if(p_price_ceiling != null)
	{
		ref = ref.where('price','<=',p_price_ceiling);
	}
	if(p_price_floor != null)
	{
		ref = ref.where('price','>=',p_price_floor);
	}
	if(p_result_limit != null)
	{
		ref = ref.limit(parseInt(p_result_limit,10));
	}
	ref.get().then(snapshot => {
		if (snapshot.empty) {
			response = {
				success: false,
				message: 'no info found'
			};
		} else {
			result = [];
			snapshot.forEach(doc => {
				var data = doc.data();
				console.log(doc.id);
				data['id'] = doc.id;
				result.push(data);
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
})

app.get('/listing',  function (req, res) {
	let token = req.headers['x-access-token'] || req.headers['authorization'];
	if (token.startsWith('Bearer ')) {
		token = token.slice(7, token.length);
	}
	if(token){
		jwt.verify(token, 'secret', function(err, decoded) {
			if(err != null){
				response = {
					success: false,
					message: err.message
				};
				res.end(JSON.stringify(response));
			}
			else{
				let id = req.query.id;
				if(id)
				{
					db.collection('posting').doc(id).get().then(function(doc) {
						if (!doc.exists) {
							response = {
								success: false,
								message: 'no info found'
							};
						} else {
							response = {
								success: true,
								data: doc.data()
							};
						}
						res.end(JSON.stringify(response));
					}).catch(function(error) {
						response = {
							success: false,
							message: error.message
						};
					});
				} else{
					response = {
						success: false,
						message: 'missing parameter id'
					};
					res.end(JSON.stringify(response));
				}
			}
		});
	} else {
		response = {
			success: false,
			message: 'missing token'
		};
		res.end(JSON.stringify(response));
	}
})

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

exports.app = functions.https.onRequest(app);