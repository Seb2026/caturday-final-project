/**Our connection to the back-end */
import axios from "axios";

const createHeaders = () => {
  return {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
};

// const serverURL = process.env.x-api-key
const serverURL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_SERVER_URL
    : `http://localhost:5000/api`;
// NODE_ENV === 'production' ? process.env.REACT_APP_SERVER_URL : `http://localhost:5000/api`

const actions = {
  getUser: async () => {
    let profile = await axios.get(`${serverURL}/user`, createHeaders());
    console.log(profile);
    return profile.data;
  },
  getMyComments: async () => {
    return await axios.get(`${serverURL}/getMyComments`, createHeaders());
  },
  getComments: async () => {
    return await axios.get(`${serverURL}/getComments`, createHeaders());
  },
  addComment: async (comment) => {
    return await axios.post(
      `${serverURL}/addComment`,
      comment,
      createHeaders()
    );
  },
  logIn: async (profile) => {
    let res = await axios.post(
      `${serverURL}/logMeIn`,
      profile.profileObj,
      createHeaders()
    );
    //Set JWT token to localStorage
    localStorage.setItem("token", res.data.token);
    return res.data.user;
  },
};

export default actions;
