import React, { Component } from "react";
//import {BrowserRouter, browserHistory, Route, Switch as Router} from "react-router-dom";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Header from './Components/Header';
import Login from "./Components/Login";
import Landing from "./Components/Landing";
import Signup from "./Components/Signup";
import AddItems from "./Components/AddItems";
import Profile from "./Components/Profile";
import DisplayItem from "./Components/DisplayItem";
import FilteredPost from "./Components/FilteredPost";

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
                    {/*<Route exact path="/filteredpost" component = {FilteredPost} />*/}

                </div>
            </Router>
        );
    }
}

export default App;