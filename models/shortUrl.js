const mongoose = require('mongoose')
const shortId = require('shortid')

// here shortid is npm package which helps in creating unique Id 
// this is db schema in which data will be stored
// as soon as original url is stored in this db ,  a corresponding short Id will be 
// created by shortId.generate method and is stored there
const shortUrlSchema = new mongoose.Schema({
    full: {
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true,
        default: shortId.generate
    }
})

module.exports = mongoose.model('shortUrl', shortUrlSchema);