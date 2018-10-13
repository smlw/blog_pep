const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        refs: 'User', //user schema
        autopopulate: true
    },
    symbolCount: {
        type: Number,
        default: 8
    },
    pwdPeriod: {
        type: Number,
        default: 86400000
    },
    recipientContact: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        autopopulate: true
    },
    updated: {
        type: Date, 
        default: Date.now 
    }
}, {
    timestamps: true
});

schema.set('toJSON', {virtuals: true});

module.exports = mongoose.model('apc', schema);