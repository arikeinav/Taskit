import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login} from "../store/actions/userActions";
import TextField from "@material-ui/core/TextField"

class _Login extends Component {
  _isMounted = false
  state = {
    
    msg: "",
    loginCred: {
      username: "",
      password: "",
    },
  };
  componentDidMount(){
    this._isMounted = true;
  }
  componentWillUnmount(){
    this._isMounted = false;
  }

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
      if (!user) this.setState({ msg: "Username or password not exist" })
      else{
        console.log(user)
    this.props.onCloseModal()
    this.setState({ loginCred: { username: "", password: "" } });
    }
  };

  render() {
    return (
      <div className="test">
        
        <form onSubmit={this.doLogin}>
          
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
          <h2 style={{color: "red" }}>{this.state.msg}</h2>
          <button className="btn">Login</button>
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
