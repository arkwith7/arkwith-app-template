import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
//Components for implementing a redux architecture that is action, dispatch, store, reducer, view
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

// reducer of redux architecture
import templateApp from "./reducers";

import MainMenuTab from "./components/MainMenuTab";
import NotFound from "./components/NotFound";

// store of redux architecture
let store = createStore(templateApp, applyMiddleware(thunk));

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={MainMenuTab} />
                        <Route component={NotFound} />
                    </Switch>
                </BrowserRouter>
            </Provider>
        )
    }
}
