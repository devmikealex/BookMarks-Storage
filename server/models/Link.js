const mongoose = require('mongoose')

const linkSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        url: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },

        // tags: [String],
        tags: [
            {
                type: mongoose.Schema.ObjectId,
                ref: 'Tag',
            },
        ],

        images: [String],
        favorite: Boolean,
        hidden: Boolean,
        clicks: {
            type: Number,
            default: 0,
        },

        crt_date: {
            type: Date,
            default: Date.now,
            immutable: true,
        },
        mod_date: { type: Date, default: Date.now },
    },
    { versionKey: false }
)

// linkSchema.pre('findOneAndUpdate', function (next) {
//     // this.mod_date = Date.now()
//     this.set({ mod_date: new Date() })
//     next()
// })

module.exports = mongoose.model('Link', linkSchema)
