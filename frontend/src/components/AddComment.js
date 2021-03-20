import React, { Component } from "react";
import axios from "axios";
import actions from "../api";

class AddComment extends Component {
  state = {
    comment: "",
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    // let res = await axios.post(`http://localhost:5000/api/addAPost`, this.state)

    let res = await actions.addComment(this.state);
    this.props.history.push("/");
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={(e) => this.setState({ comment: e.target.value })}
            name="comment"
            type="text"
            placeholder="Add A Comment"
          />
          <button> 💌 </button>
        </form>
      </div>
    );
  }
}

export default AddComment;
