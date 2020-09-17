import React, { Component } from "react";
import { connect } from "react-redux";
import { signup } from "../store/actions/userActions";

class _SignIn extends Component {
  state = {
    msg: "",
    signupCred: {
      password: "",
      username: "",
    },
  };

  signupHandleChange = (ev) => {
    const { name, value } = ev.target;
    this.setState((prevState) => ({
      signupCred: {
        ...prevState.signupCred,
        [name]: value,
      },
    }));
  };

  doSignup = async (ev) => {
    ev.preventDefault();
    const { username, password} = this.state.signupCred;
    if (!username || !password) {
      return this.setState({ msg: "All inputs are required!" });
    }
    const signupCreds = { username, password};
    this.props.signup(signupCreds);
    this.setState({ signupCred: { username: "", password: "" } });
  };

  render() {
    return (
      <div className="test">
        <h2>{this.state.msg}</h2>
        <form onSubmit={this.doSignup}>
          <input
            type="text"
            name="username"
            value={this.state.signupCred.username}
            onChange={this.signupHandleChange}
            placeholder="Username"
          />
          <br />
          <input
            name="password"
            type="password"
            value={this.state.signupCred.password}
            onChange={this.signupHandleChange}
            placeholder="Password"
          />
          <br />
          <button className="btn">Signup</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.userReducer.loggedInUser,
  };
};
const mapDispatchToProps = {
  signup,
};

export const SignIn = connect(mapStateToProps, mapDispatchToProps)(_SignIn);