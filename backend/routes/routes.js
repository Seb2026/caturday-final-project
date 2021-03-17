/**Our connection to the front-end */
const express = require('express');
const router = express.Router()
const jwt = require('jsonwebtoken')

const Post = require('../models/Post')
const User = require('../models/User')


router.get(`/`, (req, res) => {
    res.json({
        backend: '🔥'
    })
})


router.post(`/addAPost`, authorize, (req, res) => {

    Post.create({ message: req.body.message, userId: res.locals.user._id })
        .then(post => {
            res.json({ post })
        }).catch(console.error)

})


router.get('/getPosts', (req, res) => {
    Post.find({}).then(allPostsFromDb => {
        res.json(allPostsFromDb)
    })
})

router.get('/getMyPosts', authorize, (req, res) => {
    Post.find({ userId: res.locals.user._id }).then(allPostsFromDb => {
        res.json(allPostsFromDb)
    })
})



router.get('/user', authorize, (req, res) => {

    User.findById(res.locals.user._id)
        .then(user => {
            res.json(user)
        }).catch(console.error)

})



router.post('/logMeIn', async (req, res) => {

    //Check if user already exists 
    let user = await User.findOne({ email: req.body.email })

    //If s/he doesn't exist than create new user 
    if (!user) {
        user = await User.create(req.body)
    }

    //Signing the token with the user object
    jwt.sign({ user }, 'secret key', { expiresIn: '30min' }, (err, token) => {
        //Send token back to the frontend 
        res.json({ user, token })
    })


})









function authorize(req, res, next) {
    let token = req.headers['authorization'].split(' ')[1]

    if (token != 'null') {
        jwt.verify(token, 'secret key', async (err, data) => {
            if (!err) {
                console.log(data)
                res.locals.user = data.user
                next()
            } else {
                console.error(err)
            }
        })
    } else {
        res.status(403).json({ message: 'Must be logged in' })
    }
}





module.exports = router