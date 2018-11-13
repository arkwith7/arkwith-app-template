import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from "history";

//Components for implementing a redux architecture that is action, dispatch, store, reducer, view
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

// reducer of redux architecture
import templateApp from "./reducers";

//import MainMenuTab from "./components/MainMenuTab";
//import NotFound from "./components/NotFound";

import indexRoutes from "./routes/index.jsx";

const hist = createBrowserHistory();

// store of redux architecture
let store = createStore(templateApp, applyMiddleware(thunk));

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={hist}>
                    <Switch>
                    {indexRoutes.map((prop, key) => {
                        return <Route path={prop.path} component={prop.component} key={key} />;
                    })}
                    </Switch>
                </Router>
            {/* 
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={MainMenuTab} />
                        <Route component={NotFound} />
                    </Switch>
                </BrowserRouter>
            */}
            </Provider>
        )
    }
}
