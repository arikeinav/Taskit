import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login} from "../store/actions/userActions";

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
    this.props.login(userCreds);
    this.setState({ loginCred: { username: "", password: "" } });
  };


    

  render() {
    return (
      <div className="test">
        <h2>{this.state.msg}</h2>
        <form onSubmit={this.doLogin}>
          <input
            type="text"
            name="username"
            value={this.state.loginCred.username}
            onChange={this.loginHandleChange}
            placeholder="username"
          />
          <br />
          <input
            type="password"
            name="password"
            value={this.state.loginCred.password}
            onChange={this.loginHandleChange}
            placeholder="Password"
          />
          <br />
          <button>Login</button>
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
