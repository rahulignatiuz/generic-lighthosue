const mongoose = require('mongoose');

var customFormLessonFieldSchema = new mongoose.Schema({
    Org: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization"
    },
    Type: {
        type: String
    },
    Name: {
        type: String
    },
    Icon: {
        type: String
    },
    Label: {
        type: String
    },
    Description: {
        type: String
    },
    Placeholder: {
        type: String
    },
    ClassName: {
        type: String
    },
    Toggle: {
        type: Boolean,
        default: false
    },
    Required: {
        type: Boolean,
        default: false
    },
    Typeoflesson: {
        type: String
    },
    Checkbox: {
        type: Boolean,
        default: false
    },
    Section: {
        type: String
    },
    ParentLessonField: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "LessonField",
        default: null
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

mongoose.model('LessonField', customFormLessonFieldSchema);