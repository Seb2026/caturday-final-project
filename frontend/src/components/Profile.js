import React, { Component } from "react";
import actions from "../api";

class Profile extends Component {
  state = {
    comments: [],
  };

  async componentDidMount() {
    let res = await actions.getMyComments();
    console.log(res);
    this.setState({ comments: res.data });
  }

  logOut = () => {
    localStorage.removeItem("token");
    this.props.setUser({});
  };

  showMyComments = () => {
    return this.state.comments.map((eachComment) => {
      return <li key={eachComment._id}> {eachComment.comments} </li>;
    });
  };

  render() {
    console.log(this);
    return (
      <div>
        Profile
        <h2>{this.props.user?.email}</h2>
        {this.showMyComments()}
        <button onClick={this.logOut}>Log out</button>
      </div>
    );
  }
}

export default Profile;
