import React, { Component } from "react";
//import {BrowserRouter, browserHistory, Route, Switch as Router} from "react-router-dom";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Header from './Header';
import Login from "./Login";
import Landing from "./Landing";
import Signup from "./Signup";
import AddItems from "./AddItems";
import Profile from "./Profile";
import DisplayItem from "./DisplayItem";

class App extends Component {

    render(){
        return(
            <Router>
                <div>
                    <Route path="/" component = {Header}/>
                    <Route exact path="/" component = {Landing} />
                    <Route exact path="/login" component = {Login} />
                    <Route exact path="/register" component = {Signup} />
                    <Route exact path="/addItem" component = {AddItems} />
                    <Route exact path="/displayItem" component = {DisplayItem} />
                    <Route exact path="/profile" component = {Profile} /> 
                </div>
            </Router>
        );
    }
}

export default App;