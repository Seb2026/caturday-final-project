import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class Cat extends Component {
  state = {
    cats: [],
  };

  componentDidMount() {
    axios
      .get(`https://api.thecatapi.com/v1/breeds?key=${process.env.xapikey}`)
      .then((response) => {
        // console.log(response.data);
        this.setState({
          cats: response.data,
        });
      })
      .catch((error) => console.log(error));
  }

  allCats = () => {
    return this.state.cats.map((eachCat) => {
      console.log(eachCat.image);
      return (
        <div key={eachCat._id}>
          <div className="cat">
            <img src={eachCat.image?.url} alt=" unavailable" width="200vw" />
            <br />
            <Link to={`/cats/${eachCat._id}`}>
              <h3>{eachCat.name}</h3>
            </Link>
          </div>
        </div>
      );
    });
  };

  render() {
    return (
      <div className="cat-grid">
        {/* <HomeButton /> */}
        {this.allCats()}
      </div>
    );
  }
}

export default Cat;
