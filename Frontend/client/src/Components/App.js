import React, { Component } from "react";
//import {BrowserRouter, browserHistory, Route, Switch as Router} from "react-router-dom";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Header from './Header';
import Login from "./Login";
import Landing from "./Landing";
import Signup from "./Signup";
import AddItems from "./AddItems";

class App extends Component {

    render(){
        return(
            <Router>
                <div>
                    <Route path="/" component = {Header}/>
                    <Route exact path="/" component = {Landing} />
                    <Route exact path="/login" component = {Login} />
                    <Route exact path="/register" component = {Signup} />
                    <Route exact path="/addItem" component = {AddItems} />} />
                </div>
            </Router>
        );
    }
}

export default App;