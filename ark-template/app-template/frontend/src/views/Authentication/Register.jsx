import React, {Component} from "react";
import {connect} from "react-redux";

import {Redirect} from "react-router-dom";

import { Container, Row, Col, Card, CardHeader, CardBody, Button, Form, FormGroup, Input } from 'reactstrap';

import {auth} from "../../actions";
import Login from "./Login";

class Register extends Component {

    state = {
        username: "",
        password: "",
        callLogin: false,
    }

    onSubmit = e => {
        e.preventDefault();
        this.props.register(this.state.username, this.state.password);
    }

    handleClick = (e) => {
        e.preventDefault();
        // console.log('The link was clicked.');
        this.setState({callLogin: true });

    };

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/" />
        }
        if (this.state.callLogin) {
            return <Login />
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
                    <Button type="submit" className="btn btn-lg btn-success btn-block" >Register</Button>

                    <br/>
                    <p>
                        {/* 
                        Already have an account? <Link to="/login">Login</Link>
                        */}
                        Already have an account? <a href="#" onClick={(e) => {this.handleClick(e)}}>Login</a>
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

export default connect(mapStateToProps, mapDispatchToProps)(Register);
