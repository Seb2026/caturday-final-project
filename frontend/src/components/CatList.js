import axios from "axios";
import React, { Component } from "react";

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
        <div key={eachCat._id} className="cats">
          <div className="cat">
            <img
              src={eachCat.image?.url}
              alt=" image unavailable"
              width="200vw"
            />
            <br />
            {/* <Link to={`/beers/${eachBeer._id}`}><h2>{eachBeer.name}</h2></Link> */}
            {eachCat.name}
          </div>
        </div>
      );
    });
  };

  render() {
    return (
      <div>
        {/* <HomeButton /> */}
        {this.allCats()}
      </div>
    );
  }
}

export default Cat;
