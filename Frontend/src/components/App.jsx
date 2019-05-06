import React from "react"
import SignIn from "./Forms/SignIn";
import SignUp from "./Forms/SignUp";
import Student from "./UI/Student";
import Admin from "./UI/Admin";
import NotConfirmedEmail from "./UI/StudentComponents/NotConfirmedEmail";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import { connect } from "react-redux";
import { setUser } from "../store/actions/userActions";
import { setEmail } from "../store/actions/emailActions";

const App = ({ user, setUser, email }) => (
    <Router>
        <>
            <Switch>
                <Route exact path="/" component={() => {
                    if(JSON.stringify(user) == "{}"){ 
                        return (<SignIn/>);
                    }
                    if(email == false) {
                        return <Redirect from="/" to="/confirm" />
                    }
                    return <Redirect from="/" to="/student" />
                }} />
                <Route path="/sign-up" component={() => {
                    if(JSON.stringify(user) == "{}"){ 
                        return (<SignUp/>);
                    }
                    if(email == false) {
                        return <Redirect from="/sign-up" to="/confirm" />
                    }
                    return <Redirect from="/sign-up" to="/student" />
                }} />
                <Route path="/student" component={() => {
                    if(JSON.stringify(user) != '{}'){
                        if(user.isAdmin == true) {
                            return <Redirect from="/student" to="/admin" />
                        }
                        if(email == false) {
                            return <Redirect from="/student" to="/confirm" />
                        }
                        return (<Student/>);
                    }
                    return <Redirect from="/student" to="/" />
                }} />
                <Route path="/admin" component={() => {
                    if(user.isAdmin == true){ 
                        return (<Admin/>);
                    } else {
                        return <Redirect from="/admin" to="/" />
                    }
                }} />
                <Route path="/confirm" component={() => {
                    if(JSON.stringify(user) != '{}') {
                        if(user.isAdmin == false) {
                            if(email == false) {
                                return <NotConfirmedEmail/>
                            }
                            return <Redirect from="/confirm" to="/student" />
                        }
                        return <Redirect from="/confirm" to="/admin" />
                    }
                    return <Redirect from="/confirm" to="/" />
                }} />
                <Route to="/:id" component={() => (<h1>Not found</h1>)} />
            </Switch>
        </>
    </Router>
);

const mapStateToProps = ({ user, email }) => ({
    user,
    email,
});

const mapDispatchToProps = {
    setUser,
    setEmail,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);