const mongoose = require('mongoose');

var LessonSchema = new mongoose.Schema({
    Org: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization" 
    },
    Typeoflesson: {
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

mongoose.model('Lesson', LessonSchema);