import React, { Component } from "react";
import "./App.css";
import Home from "./components/Home";
import AddComment from "./components/AddComment";
import CatList from "./components/CatList";
import CatDetail from "./components/CatDetail";
import RescueStories from "./components/RescueStories";
import SignUp from "./components/auth/Signup";
import Profile from "./components/Profile";
import { Switch, Route, Link } from "react-router-dom";
import AuthService from "./components/auth/auth-service";
import Login from "./components/auth/Login";

class App extends Component {
  state = {
    loggedInUser: null,
  };

  service = new AuthService();

  fetchUser() {
    if (this.state.loggedInUser === null) {
      this.service
        .loggedin()
        .then((response) => {
          this.setState({
            loggedInUser: response,
          });
        })
        .catch((err) => {
          this.setState({
            loggedInUser: false,
          });
        });
    }
  }

  getTheUser = (userObj) => {
    this.setState({
      loggedInUser: userObj,
    });
  };

  logoutUser = () => {
    console.log("appjs");
    this.service.logout().then(() => {
      this.setState({ loggedInUser: null });
    });
  };

  // async componentDidMount() {
  //   let user = await actions.getUser();
  //   console.log("user is ", user);
  //   this.setState({ user });
  // }

  // setUser = (user) => {
  //   this.setState({ user });
  // };

  render() {
    this.fetchUser();
    if (this.state.loggedInUser) {
      return (
        <div>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/cat-list">Cats</Link>
            <Link to="/rescueStories">RescueStories</Link>
            <Link to="/login">Login</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/signup"> Signup</Link>
            <Link to="/">
              <button onClick={this.logoutUser}>Logout </button>
            </Link>
          </nav>
          <h1>
            Every Day is
            <br />
            Caturday
          </h1>
          {/* <h2>
          {this.state.user?.email} <img src={this.state.user?.imageUrl} />
        </h2> */}

          <Switch>
            <Route exact path="/" render={(props) => <Home {...props} />} />
            <Route
              exact
              path="/add-comment"
              render={(props) => <AddComment {...props} />}
            />
            <Route
              exact
              path="/cat-list"
              render={(props) => <CatList {...props} />}
            />

            <Route
              exact
              path="/cat-detail/:id"
              render={(props) => <CatDetail {...props} />}
            />
            <Route
              exact
              path="/signup"
              render={(props) => (
                <SignUp getUser={this.getTheUser} {...props} />
              )}
            />
            <Route
              exact
              path="/login"
              render={(props) => <Login getUser={this.getTheUser} {...props} />}
            />

            <Route
              exact
              path="/rescueStories"
              render={(props) => <RescueStories {...props} />}
            />

            <Route
              exact
              path="/profile"
              render={(props) => (
                <Profile userInSession={this.state.loggedInUser} {...props} />
              )}
            />
          </Switch>
        </div>
      );
    } else {
      return (
        // <main className="App">
        <div>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/cat-list">Cats</Link>
            <Link to="/rescueStories">RescueStories</Link>
            <Link to="/login">Login</Link>
            {/* {this.state.user.email ? ( */}
            {/* ) : ( */}
            <Link to="/signup"> Signup</Link>
            {/* )} */}
          </nav>
          <h1>
            Every Day is
            <br />
            Caturday
          </h1>
          {/* <h2>
            {this.state.user?.email} <img src={this.state.user?.imageUrl} />
          </h2> */}

          <Switch>
            <Route exact path="/" render={(props) => <Home {...props} />} />
            <Route
              exact
              path="/add-comment"
              render={(props) => <AddComment {...props} />}
            />
            <Route
              exact
              path="/cat-list"
              render={(props) => <CatList {...props} />}
            />

            <Route
              exact
              path="/cat-detail/:id"
              render={(props) => <CatDetail {...props} />}
            />
            <Route
              exact
              path="/signup"
              render={(props) => (
                <SignUp getUser={this.getTheUser} {...props} />
              )}
            />
            <Route
              exact
              path="/login"
              render={(props) => <Login getUser={this.getTheUser} {...props} />}
            />

            <Route
              exact
              path="/rescueStories"
              render={(props) => <RescueStories {...props} />}
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
        </div>
      );
    }
  }
}

export default App;
