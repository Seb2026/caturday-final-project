const { Schema, model, ObjectId } = require('mongoose')

const postSchema = new Schema({
    message: String,
    userId: { type: Schema.Types.ObjectId, ref: 'User' }
})

module.exports = model('Post', postSchema)