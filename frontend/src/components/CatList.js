import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class Cat extends Component {
  state = {
    cats: [],
    filteredCats: [],
    image: "",
  };

  componentDidMount() {
    axios
      .get(`https://api.thecatapi.com/v1/breeds?key=${process.env.xapikey}`)
      .then((response) => {
        // console.log(response.data);
        this.setState({
          cats: response.data,
          filteredCats: response.data,
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
      });
  }

  handleChange = (e) => {
    console.log(e.target.value, e.target.name);
    this.setState({ [e.target.name]: e.target.value });
  };

  search = (e) => {
    let searchCats = this.state.cats.filter((elem) => {
      // if(elem.)
      // return elem.name.toLowerCase().includes(e.target.value.toLowerCase());
      if (
        elem.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        elem.description.toLowerCase().includes(e.target.value.toLowerCase()) ||
        elem.temperament.toLowerCase().includes(e.target.value.toLowerCase())
      ) {
        return elem;
      }
    });
    this.setState({ filteredCats: searchCats });
  };

  allCats = () => {
    return this.state.filteredCats.map((eachCat) => {
      console.log(eachCat.image);
      return (
        <div key={eachCat._id}>
          <div className="cat">
            <img src={eachCat.image?.url} alt=" unavailable" width="200vw" />
            <br />
            <Link to={`/cat-detail/${eachCat.id}`}>
              <h3>{eachCat.name}</h3>
            </Link>
          </div>
        </div>
      );
    });
  };

  render() {
    return (
      <>
        <input
          onChange={this.search}
          name="search"
          placeholder="Keyword Search"
          type="text"
        />

        <div className="cat-grid">
          {/* <HomeButton /> */}
          {this.allCats()}
        </div>
      </>
    );
  }
}

export default Cat;
