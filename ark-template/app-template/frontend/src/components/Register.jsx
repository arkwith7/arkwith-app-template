import React, {Component} from "react";
import {connect} from "react-redux";

import {Link, Redirect} from "react-router-dom";

import { Container, Row, Col, Card, CardHeader, CardBody, Button, Form, FormGroup, Input } from 'reactstrap';

import {auth} from "../actions";

class Login extends Component {

    state = {
        username: "",
        password: "",
    }

    onSubmit = e => {
        e.preventDefault();
        this.props.register(this.state.username, this.state.password);
    }

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/" />
        }
        return (
        
        <Container>
          <Row>
            <Col md={{ size: 4, offset: 4 }}>
                   
            <Card className="login-panel panel panel-default">
            <CardHeader className="panel-heading" tag="h3">User registration</CardHeader>
            <CardBody className="panel-body">
  
            <Form onSubmit={this.onSubmit}>
                    {this.props.errors.length > 0 && (
                        <ul>
                            {this.props.errors.map(error => (
                                <li key={error.field}>{error.message}</li>
                            ))}
                        </ul>
                    )}
                    <FormGroup>
                        <Input type="text" name="username" id="username" placeholder="Username"
                            onChange={e => this.setState({username: e.target.value})} />
                    </FormGroup>
                    <FormGroup>
                        <Input type="password" name="password" id="password" placeholder="Password"
                            onChange={e => this.setState({password: e.target.value})} />
                    </FormGroup>
                    <Button type="submit" className="btn btn-lg btn-success btn-block" bsStyle="success" block>Register</Button>

                    <p>
                        Already have an account? <Link to="/login">Login</Link>
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
        register: (username, password) => dispatch(auth.register(username, password)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
