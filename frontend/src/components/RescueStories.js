import React, { Component } from "react";

class RescueStories extends Component {
  render() {
    return (
      <div>
        <form>
          <input type="text" name="name" placeholder="Cat's Name" />
          <br />
          <input type="number" name="age" placeholder="Age" /> <br />
          <input type="text" name="breed" placeholder="Breed" /> <br />
          <label>Tell your cat's story:</label>
          <br />
          <textarea name="story" cols="80" rows="10"></textarea>
          <br />
          <label>Show off your beautiful Furbaby!</label>
          <br />
          <input type="file" name="image" />
        </form>
      </div>
    );
  }
}

export default RescueStories;
