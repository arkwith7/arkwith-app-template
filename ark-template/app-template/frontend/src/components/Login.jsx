import React, {Component} from "react";
import {connect} from "react-redux";

import {Link, Redirect} from "react-router-dom";

import {auth} from "../actions";

import { Container, Row, Col, Card, CardHeader, CardBody, Button, Form, FormGroup, Input } from 'reactstrap';

class Login extends Component {

    state = {
        username: "",
        password: "",
    }

    onSubmit = e => {
        e.preventDefault();
        this.props.login(this.state.username, this.state.password);
    }

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/note" />
        }
        return (

        <Container>
          <Row>
            <Col md={{ size: 4, offset: 4 }}>
                 
            <Card className="login-panel panel panel-default">
            <CardHeader className="panel-heading" tag="h3">Please Sign In</CardHeader>
            <CardBody className="panel-body">
  
                <Form onSubmit={this.onSubmit}>

                    <p>
                        {this.props.errors.length > 0 && (
                            <ul>
                                {this.props.errors.map(error => (
                                    <li key={error.field}>{error.message}</li>
                                ))}
                            </ul>
                        )}
                    </p>

                    <FormGroup>
                        <Input type="text" name="username" id="username" placeholder="Username"
                        onChange={e => this.setState({username: e.target.value})} />
                    </FormGroup>
                    <FormGroup>
                        <Input type="password" name="password" id="password" placeholder="Password"
                        onChange={e => this.setState({password: e.target.value})} />
                    </FormGroup>
                    <Button type="submit" className="btn btn-lg btn-success btn-block" bsStyle="success" block>Login</Button>
                    <p>
                        Don't have an account? <Link to="/register">Register</Link>
                    </p>
                </Form>

            </CardBody>
            </Card>

            </Col>
          </Row>
        </Container>

        )
    }
}

const mapStateToProps = state => {
    let errors = [];
    if (state.auth.errors) {
        errors = Object.keys(state.auth.errors).map(field => {
            return {field, message: state.auth.errors[field]};
        });
    }
    return {
        errors,
        isAuthenticated: state.auth.isAuthenticated
    };
}

const mapDispatchToProps = dispatch => {
    return {
        login: (username, password) => {
            return dispatch(auth.login(username, password));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
