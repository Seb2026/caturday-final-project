import React, { Component } from "react";
import AuthService from "./auth-service";
import { Link } from "react-router-dom";

class Login extends Component {
  state = { username: "", password: "" };

  service = new AuthService();

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    this.service
      .login(username, password)
      .then((response) => {
        this.setState({ username: "", password: "" });
        this.props.getUser(response);
      })
      .catch((error) => console.log(error));

    // this.props.history.push("/");
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            onChange={(e) => this.handleChange(e)}
            value={this.state.username}
          />
          <label>Password:</label>
          <input
            name="password"
            type="password"
            onChange={(e) => this.handleChange(e)}
            value={this.state.password}
          />

          <input type="submit" value="Login" />
        </form>
        <p>
          Don't have account?
          <Link to={"/signup"}> Signup</Link>
        </p>
      </div>
    );
  }
}

export default Login;
