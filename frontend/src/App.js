import React, { Component } from "react";
import "./App.css";
import Home from "./components/Home";
import AddComment from "./components/AddComment";
import CatList from "./components/CatList";
import Auth from "./components/Auth";
import Profile from "./components/Profile";
import { Switch, Route, Link } from "react-router-dom";
import actions from "./api";

class App extends Component {
  state = {
    user: {},
  };

  async componentDidMount() {
    let user = await actions.getUser();
    console.log("user is ", user);
    this.setState({ user });
  }

  setUser = (user) => {
    this.setState({ user });
  };

  render() {
    return (
      <main className="App">
        <h1>Caturday</h1>
        <h2>
          {this.state.user?.email} <img src={this.state.user?.imageUrl} />
        </h2>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/cats">Cats</Link>
          <Link to="/add-comment">Add Comment</Link>
          {this.state.user.email ? (
            <Link to="/profile">Profile</Link>
          ) : (
            <Link to="/auth"> Log In</Link>
          )}
        </nav>

        <Switch>
          <Route exact path="/" render={(props) => <Home {...props} />} />
          <Route
            exact
            path="/add-comment"
            render={(props) => <AddComment {...props} />}
          />
          <Route
            exact
            path="/cats"
            render={(props) => <CatList {...props} />}
          />
          <Route
            exact
            path="/auth"
            render={(props) => <Auth setUser={this.setUser} {...props} />}
          />
          <Route
            exact
            path="/profile"
            render={(props) => (
              <Profile
                user={this.state.user}
                setUser={this.setUser}
                {...props}
              />
            )}
          />
        </Switch>
      </main>
    );
  }
}

export default App;
