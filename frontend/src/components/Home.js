import React, { Component } from "react";
import axios from "axios";
import actions from "../api";

class Home extends Component {
  state = {
    comments: [],
  };

  async componentDidMount() {
    // let res = await axios.get(`http://localhost:5000/api/getPosts`)
    // console.log(res)
    // let res = await actions.getComments();
    // this.setState({ comments: res.data });
    let cats = await axios.get(
      `https://api.thecatapi.com/v1/breeds?key=${process.env.xapikey}`
    );
    // console.log(cats);
  }

  showComment = () => {
    return this.state.comments.map((eachComment) => {
      return <li key={eachComment._id}> {eachComment.comment} </li>;
    });
  };

  render() {
    return (
      <div>
        Home
        {this.showComment()}
      </div>
    );
  }
}

export default Home;
