const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        autopopulate: true
    },
    path: {
        type: String,
        require: true
    }
}, {
    timestamps: true
});

schema.set('toJSON', {virtuals: true});

module.exports = mongoose.model('Upload', schema);