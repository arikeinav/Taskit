import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login } from "../store/actions/userActions";
import TextField from "@material-ui/core/TextField"

class _Login extends Component {
  
  state = {

    msg: "",
    loginCred: {
      username: "",
      password: "",
    },
  };
  

  loginHandleChange = (ev) => {
    const { name, value } = ev.target;
    this.setState((prevState) => ({
      loginCred: {
        ...prevState.loginCred,
        [name]: value,
      },
    }));
  };

  doLogin = async (ev) => {
    ev.preventDefault();
    const { username, password } = this.state.loginCred;
    if (!username || !password) {
      return this.setState({ msg: "Please enter user/password" });
    }

    const userCreds = { username, password };
    const user = await this.props.login(userCreds)
      if (!user) this.setState({ msg: "There isn't an account for this user" })
      else{
    this.props.onCloseModal()
    this.setState({ loginCred: { username: "", password: "" } });
    }
  }

  render() {
    return (
      <div className="login">
        
        <form onSubmit={this.doLogin}>
          
     <div className="error-msg"> <h5>{this.state.msg}</h5></div> 
      <h3>Login to Taskit</h3>
              <TextField
            id="outlined-basic"
            type="text"
            name="username"
            value={this.state.loginCred.username}
            onChange={this.loginHandleChange}
            label="Username"
            variant="outlined"
          />

          <br />
          <br />
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
          <br />
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
