import React, {Component} from "react";
import {connect} from "react-redux";

import {auth} from "../../actions";

import { Container, Row, Col, Card, CardHeader, CardBody, Button, Form, FormGroup, Input } from 'reactstrap';
import PonyNote from "../../components/PonyNote";
import Register from "./Register";

class Login extends Component {

    state = {
        username: "",
        password: "",
        callRegister: false,
    }

    onSubmit = e => {
        e.preventDefault();
        this.props.login(this.state.username, this.state.password);
    }

    handleClick = (e) => {
        e.preventDefault();
        // console.log('The link was clicked.');
        this.setState({callRegister: true });

    };

    registerUser = () => {
        return <Register />
    }

    render() {
        if (this.props.isAuthenticated) {
//            return <Redirect to="/" />
            return <PonyNote />
        }
        if (this.state.callRegister) {
            return <Register />
        }
        return (

        <Container>
          <Row>
            <Col md={{ size: 4, offset: 4 }}>
                 
            <Card className="login-panel panel panel-default">
            <CardHeader className="panel-heading" tag="h3">Please Sign In</CardHeader>
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
                    <Button type="submit" className="btn btn-lg btn-success btn-block" >Login</Button>
                    <br/>
                    <p>
                        {/* 
                        Don't have an account? <Link to="/register">Register</Link>
                        */}
                        Don't have an account? <a href="#" onClick={(e) => {this.handleClick(e)}}>Register</a>
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
