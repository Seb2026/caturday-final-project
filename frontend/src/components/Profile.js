import React, { Component } from "react";
import actions from "../api";

class Profile extends Component {
  state = {
    loggedInUser: null,
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.state, loggedInUser: nextProps["userInSession"] });
  }

  // async componentDidMount() {
  //   let res = await actions.getMyComments();
  //   console.log(res);
  //   this.setState({ comments: res.data });
  // }

  // logOut = () => {
  //   localStorage.removeItem("token");
  //   this.props.setUser({});
  // };

  // showMyComments = () => {
  //   return this.state.comments.map((eachComment) => {
  //     return <li key={eachComment._id}> {eachComment.comments} </li>;
  //   });
  // };

  render() {
    if (this.state.loggedInUser) {
      return (
        <div>
          Profile
          <h2>{this.state.loggedInUser.email}</h2>
        </div>
      );
    } else {
      return <div>Please sign up</div>;
    }
  }
}

export default Profile;
