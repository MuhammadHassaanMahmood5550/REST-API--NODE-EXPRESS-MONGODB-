const mongoose = require('mongoose');

//schema = describe how that data will look

const postSchema = mongoose.Schema({
    // title: String,
    //OR if nessary to fill then
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }  
});

module.exports = mongoose.model('Posts', postSchema);
//this will show in our atlus database
//we created a model we gave it a name Posts and tell which schema to use