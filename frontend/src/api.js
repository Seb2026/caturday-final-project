/**Our connection to the back-end */
import axios from 'axios'

const createHeaders = () => {
    return {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }
}


const serverURL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_SERVER_URL : `http://localhost:5000/api`

const actions = {
    getUser: async () => {
        let profile = await axios.get(`${serverURL}/user`, createHeaders())
        console.log(profile)
        return profile.data
    },
    getMyPosts: async () => {
        return await axios.get(`${serverURL}/getMyPosts`, createHeaders())
    },
    getPosts: async () => {
        return await axios.get(`${serverURL}/getPosts`, createHeaders())
    },
    addPost: async (post) => {
        return await axios.post(`${serverURL}/addAPost`, post, createHeaders())
    },
    logIn: async (profile) => {
        let res = await axios.post(`${serverURL}/logMeIn`, profile.profileObj, createHeaders())
        //Set JWT token to localStorage
        localStorage.setItem('token', res.data.token)
        return res.data.user
    }


}

export default actions


