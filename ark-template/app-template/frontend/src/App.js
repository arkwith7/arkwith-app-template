import React, { Component } from 'react';
import {Route, Switch, BrowserRouter, Redirect} from 'react-router-dom';
//Components for implementing a redux architecture that is action, dispatch, store, reducer, view
import { Provider, connect } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
// some actions of redux architecture
import {auth} from "./actions";
// reducer of redux architecture
import templateApp from "./reducers";

import PonyNote from "./components/PonyNote";
import NotFound from "./components/NotFound";
import Register from "./components/Register";
import Login from "./components/Login";
import MainMenuTab from "./components/MainMenuTab";

// store of redux architecture
let store = createStore(templateApp, applyMiddleware(thunk));

class RootContainerComponent extends Component {

    componentDidMount() {
        this.props.loadUser();
    }

    PrivateRoute = ({component: ChildComponent, ...rest}) => {
        return <Route {...rest} render={props => {
            if (this.props.auth.isLoading) {
                return <em>Loading...</em>;
            } else if (!this.props.auth.isAuthenticated) {
                return <Redirect to="/login" />;
            } else {
                return <ChildComponent {...props} />
            }
        }} />
    }

    render() {
        let {PrivateRoute} = this;
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={MainMenuTab} />
                    <PrivateRoute exact path="/note" component={PonyNote} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
                    <Route component={NotFound} />
                </Switch>
            </BrowserRouter>
        );
    }
}
//The state value to be used in the view(Presentation Component) returned by the reducer.
//The name of reducer is auth
const mapStateToProps = state => {
    return {
        auth: state.auth,
    }
}
//Change the state of the view(Presentation Component)
// by dispatching an action to the reducer in the store.
const mapDispatchToProps = dispatch => {
    return {
        loadUser: () => {
            return dispatch(auth.loadUser());
        }
    }
}

let RootContainer = connect(mapStateToProps, mapDispatchToProps)(RootContainerComponent);

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <RootContainer />
            </Provider>
        )
    }
}
