const mongoose = require('mongoose');

var organizationSchema = new mongoose.Schema({
    Name: {
        type: String,
        index: true,
        unique: true,
        required: true
    },
    SubDomainName: {
        type: String,
        index: true,
        unique: true,
        required: true
    },
    LogoPath: {
        type: String
    },
    CreatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    UpdatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    CreatedDate: {
        type: Date,
        default: Date.now
    },
    UpdatedDate: {
        type: Date,
        default: Date.now
    },
    Active: {
        type: Boolean
    }

});

mongoose.model('Organization', organizationSchema);