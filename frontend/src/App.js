import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from "react-dom";
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react'
import { createBrowserHistory } from "history";
import { Router, Switch, Route, withRouter } from 'react-router-dom'

import './App.css'
import Navbar from 'components/Navbar'
import ShoppingPage from 'containers/ShoppingPage'
import CartPage from 'containers/CartPage'
import AccountPage from 'containers/AccountPage'
import { filterProducts } from 'store/actions/Products'
import { checkAuthorizationToken } from 'store/actions/Auth'

import 'assets/scss/material-kit-react.scss?v=1.4.0';

// pages for this product
import Components from "views/Components/Components.jsx";
import LandingPage from "views/LandingPage/LandingPage.jsx";
import ProfilePage from "views/ProfilePage/ProfilePage.jsx";
import LoginPage from "views/LoginPage/LoginPage.jsx";

var hist = createBrowserHistory();

const Main = () => {
    return (
        <main>
            <Router history={hist}>
                <Switch>

                    <Route exact path='/' component={ShoppingPage} />
                    {/* 
                    <Route path="/" component={Components} />
                */}

                    <Route path='/cart' component={CartPage} />
                    <Route path='/account' component={AccountPage} />
                    <Route path="/landing-page" component={LandingPage} />
                    <Route path="/profile-page" component={ProfilePage} />
                    <Route path="/login-page" component={LoginPage} />
                </Switch>
            </Router>
        </main>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showSearch: true
        }
    }

    componentDidMount() {
        if (localStorage.jwtToken) {
            this.props.checkAuthorizationToken(localStorage.jwtToken)
        }
    }

    componentWillReceiveProps(newProps) {
        if (this.props.history.location.pathname !== '/') {
            this.setState({ showSearch: false })
        } else {
            this.setState({ showSearch: true })
        }
    }

    render() {
        return (
            <div>
                {/*
                */}
                <Container fluid>
                    <Navbar
                        showSearch={this.state.showSearch}
                        itemsInCartCount={this.props.itemsInCartCount}
                        products={this.props.products}
                        filterProducts={this.props.filterProducts}
                    />
                </Container>

                <Container id='content-wrapper'>
                    <Main />
                </Container>
            </div>
        )
    }
}

App.propTypes = {
    itemsInCartCount: PropTypes.number.isRequired,
    products: PropTypes.array,
    filterProducts: PropTypes.func.isRequired,
    checkAuthorizationToken: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        itemsInCartCount: state.cart.length,
        products: state.products.data
    }
}


export default withRouter(connect(mapStateToProps, { filterProducts, checkAuthorizationToken })(App))
