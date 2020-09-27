import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login } from "../store/actions/userActions";
import TextField from "@material-ui/core/TextField"

class _Login extends Component {
  
  state = {

    msg: "",
    loginCred: {
      userName: "",
      password: "",
    },
  };
  

  loginHandleChange = (ev) => {
    const { name, value } = ev.target;
    this.setState((prevState) => ({msg:"",
      loginCred: {
        ...prevState.loginCred,
        [name]: value,
      },
    }));
  };

  doLogin = async (ev) => {
    ev.preventDefault();
    const { userName, password } = this.state.loginCred;
    if (!userName || !password) {
      return this.setState({ msg: "Please enter user/password" });
    }

    const userCreds = { userName, password };
    const user = await this.props.login(userCreds)
      if (!user) this.setState({ msg: "There isn't an account for this user" })
      else{
    this.props.onCloseModal()
    this.setState({ loginCred: { userName: "", password: "" } });
    }
  }

  render() {
    return (
      <div >
        <h3>Login to Taskit</h3>
        <form className="login-page" onSubmit={this.doLogin}>
              <TextField
            id="outlined-basic"
            type="text"
            name="userName"
            value={this.state.loginCred.userName}
            onChange={this.loginHandleChange}
            label="Username"
            variant="outlined"
          />

          <br />
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            name="password"
            value={this.state.loginCred.password}
            onChange={this.loginHandleChange}
            autoComplete="current-password"
            variant="outlined"
          />
          <br/>
          
     {this.state.msg &&<div className="error-msg"> <h5>{this.state.msg}</h5></div>} 
     <br/>
     <br/>
          <button className="btn login-btn">Login</button>
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

  login,
};


export const Login = connect(mapStateToProps, mapDispatchToProps)(_Login);
