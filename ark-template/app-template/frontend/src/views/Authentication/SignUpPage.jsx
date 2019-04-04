import React, { Component } from "react";
import { connect } from "react-redux";
//import { Redirect } from "react-router-dom";

import { auth } from "../../actions";
//import Login from "./LoginPage.jsx";
import SignUpForm from "../../components/Authentication/SignUpForm.jsx";

class SignUpPage extends Component {
  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    // set the initial component state
    this.state = {
      errors: {},
      user: {
        username: "",
        password: "",
        email: ""
      }
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();
    this.props.register(this.state.user.username, this.state.user.password);
  }

  /**
   * Render the component.
   */
  render() {
    // if (this.props.isAuthenticated) {
    //   return <Redirect to="/" />;
    // }
    return (
      <SignUpForm
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.props.errors}
        user={this.state.user}
      />
    );
  }
}
const mapStateToProps = state => {
  let errors = [];
  if (state.auth.errors) {
    errors = Object.keys(state.auth.errors).map(field => {
      return { field, message: state.auth.errors[field] };
    });
  }
  return {
    errors,
    isAuthenticated: state.auth.isAuthenticated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    register: (username, password) =>
      dispatch(auth.register(username, password))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpPage);
