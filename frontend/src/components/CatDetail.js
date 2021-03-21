import React, { Component } from "react";
import axios from "axios";

class CatDetail extends Component {
  state = {
    catDetails: {},
    image: "",
  };

  componentDidMount() {
    axios
      .get(
        `https://api.thecatapi.com/v1/breeds/${this.props.match.params.id}?key=${process.env.xapikey}`
      )
      .then((response) => {
        console.log(this.props.match.params.id);
        this.setState({
          catDetails: response.data,
        });
      });
    axios
      .get(
        `https://api.thecatapi.com/v1/images/search?breed_id=${this.props.match.params.id}`
      )
      .then((response) => {
        console.log("-=-=-=-=-=-=-=-=-", response.data[0].url);
        this.setState({
          image: response.data[0].url,
        });
      })
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <div>
        <img className="cat-img" src={this.state.image} alt="unavailable" />
        <p>{this.state.catDetails.name}</p>
        <p>{this.state.catDetails.description}</p>

        
      </div>
    );
  }
}

export default CatDetail;
