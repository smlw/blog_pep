const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    pwdUserId: {
        type: Schema.Types.ObjectId //user schema
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
        type: String,
        unique: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

schema.set('toJSON', {virtuals: true});

module.exports = mongoose.model('apc', schema);