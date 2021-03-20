import React, { Component } from 'react';
import axios from 'axios';

class CatDetail extends Component {

    state = {
        catDetails : {},
    }

    componentDidMount() {
    axios
      .get(`https://api.thecatapi.com/v1/breeds/${this.props.match.params.id}?key=${process.env.xapikey}`) 
      .then((response) => {
        console.log(this.props.match.params.id);
        this.setState({
          catDetails :response.data,
        });
      })
      .catch((error) => console.log(error));
    }
    render() {
        return (
            <div>
             <p>{this.state.catDetails.name}</p>   
             <p>{this.state.catDetails.description}</p>
            </div>
        );
    }
}

export default CatDetail;