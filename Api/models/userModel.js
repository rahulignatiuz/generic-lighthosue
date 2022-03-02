const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    Org: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization" 
    },
    FirstName: {
        type: String
    },
    LastName: {
        type: String
    },
    Email: {
        type: String,
        index: true,
        unique: true,
        required: true
    },
    Sub: {
        type: String
    },
    Picture: {
        type: String
    },
    EmailVerified: {
        type: Boolean
    },
    Hd: {
        type: String
    },
    OrgAdmin: {
        type: Boolean
    },
    Roles: [{
        Roleid: {
            type: Number,
            default: 3
        },
        RoleName: {
            type: String,
            default: 'user',
            enum: ["user", "pm", "admin", "sa"]
        },
        _id: false
    }],
    // Roles: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Roles" // this name should be same as the model name specified while declaring model
    // },
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

mongoose.model('User', userSchema);