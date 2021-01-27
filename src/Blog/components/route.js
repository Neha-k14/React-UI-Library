import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//components
import AddPost from "./AddPost";
import { Component } from 'react';


export default class RouteList extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/addPost'>
                        <AddPost />
                    </Route>


                </Switch>
            </Router>
        );
    }
}
