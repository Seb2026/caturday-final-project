const { Schema, model, ObjectId } = require('mongoose')

const commentSchema = new Schema({
    comment: String,
    userId: { type: Schema.Types.ObjectId, ref: 'User' }
})

module.exports = model('Comment', commentSchema)