import axios from "axios";
import React, { Component } from "react";
import actions from "../api";
class Auth extends Component {
  state = {
    email: "",
    password: "",
  };

  handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/logmein", this.state)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));

    this.props.history.push("/");
  };

  handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          onChange={this.handleChange}
          type="text"
          name="email"
          placeholder="Enter email"
        />
        <input
          onChange={this.handleChange}
          type="password"
          name="password"
          placeholder="******"
        />
        <button>Login</button>
      </form>
    );
  }
}

export default Auth;
