const mongoose = require('mongoose')

const tagSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        counter: {
            type: Number,
            default: 0,
        },
    },
    { versionKey: false }
)

module.exports = mongoose.model('Tag', tagSchema)
