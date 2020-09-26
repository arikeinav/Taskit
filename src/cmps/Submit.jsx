import React, { Component } from "react";
import { connect } from "react-redux";
import { signup } from "../store/actions/userActions";
import TextField from "@material-ui/core/TextField";

class _Submit extends Component {
  state = {
    msg: "",
    signupCred: {
      password: "",
      userName: "",
    },
  };

  signupHandleChange = (ev) => {
    const { name, value } = ev.target;
    this.setState((prevState) => ({msg:"",
      signupCred: {
        ...prevState.signupCred,
        [name]: value,
      },
    }));
  };

  doSignup = async (ev) => {
    ev.preventDefault();
    const { userName, password } = this.state.signupCred;
    if (!userName || !password) {
      return this.setState({ msg: "All inputs are required!" });
    }
    const signupCreds = { userName, password };
    this.props.signup(signupCreds);
    this.props.onCloseModal();
    this.setState({ signupCred: { userName: "", password: "" } });
  };

  render() {
    return (
      <div >
        <h3>Sign in to Taskit</h3>
        <form className="login-page" onSubmit={this.doSignup}>

          <TextField
            id="outlined-basic"
            type="text"
            name="userName"
            value={this.state.signupCred.userName}
            onChange={this.signupHandleChange}
            label="Username"
            variant="outlined"
          />

          <br />

          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            name="password"
            value={this.state.signupCred.password}
            onChange={this.signupHandleChange}
            autoComplete="current-password"
            variant="outlined"
          />
          <br />
          {this.state.msg &&<div className="error-msg"> <h5>{this.state.msg}</h5></div>} 
     <br/>
     <br/>
          <button className="btn login-btn">Signin</button>
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

export const Submit = connect(mapStateToProps, mapDispatchToProps)(_Submit);
