const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    pwdUserId: {
        type: Schema.Types.ObjectId,//user schema
        ref: 'User'
    },
    pwdPeriod: {
        type: Number,
        default: 86400000
    },
    isActive: {
        type: Boolean,
        default: true
    },
    length: {
        type: Number,
        default: 8
    }, 
    numbers: {
        type: Boolean,
        default: false
    }, 
    symbols: {
        type: Boolean,
        default: false
    }, 
    uppercase: {
        type: Boolean,
        default: true
    }, 
    excludeSimilarCharacters: {
        type: Boolean,
        default: false
    }, 
    exclude:{
        type: String,
        default: ''
    }, 
    sctrict: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
}); 

schema.set('toJSON', {virtuals: true});

module.exports = mongoose.model('Apc', schema);