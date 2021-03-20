/**Our connection to the front-end */
const express = require('express');
const router = express.Router()
const jwt = require('jsonwebtoken')

const Comment = require('../models/Comment')
const User = require('../models/User')


router.get(`/`, (req, res) => {
    res.json({
        backend: '🔥'
    })
})


router.post(`/addComment`, authorize, (req, res) => {

    Comment.create({ comment: req.body.comment, userId: res.locals.user._id })
        .then(comment => {
            res.json({ comment })
        }).catch(console.error)

})


router.get('/getComments', (req, res) => {
    Comment.find({}).then(allCommentsFromDb => {
        res.json(allCommentsFromDb)
    })
})

router.get('/getMyComments', authorize, (req, res) => {
    Comment.find({ userId: res.locals.user._id }).then(allCommentsFromDb => {
        res.json(allCommentsFromDb)
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