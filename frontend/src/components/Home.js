import React, { Component } from 'react';
import axios from 'axios'
import actions from '../api'

class Home extends Component {

    state = {
        posts: []
    }

    async componentDidMount() {
        // let res = await axios.get(`http://localhost:5000/api/getPosts`)
        // console.log(res)
        let res = await actions.getPosts()
        this.setState({ posts: res.data })
    }

    showPosts = () => {
        return this.state.posts.map(eachPost => {
            return <li key={eachPost._id}> {eachPost.message} </li>
        })
    }

    render() {
        return (
            <div>
                Home
                {this.showPosts()}
            </div>
        );
    }
}

export default Home;