import  firebase from 'firebase';

var config = {
    apiKey: "AIzaSyBfkeTA-3ivv_EUOi6vTj5UP4530moiec4",
    authDomain: "instyle-5f93a.firebaseapp.com",
    databaseURL: "https://instyle-5f93a.firebaseio.com",
    projectId: "instyle-5f93a",
    storageBucket: "instyle-5f93a.appspot.com",
    messagingSenderId: "620412495745"
};

firebase.initializeApp(config);

export default firebase;

