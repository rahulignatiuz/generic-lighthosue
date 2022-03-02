const mongoose = require('mongoose');

var autocompleteModelSchema = new mongoose.Schema({
    LessonField: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "LessonField"
    },
    ParentLessonFieldElement: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Autocomplete"
    },
    Name: {
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

mongoose.model('Autocomplete', autocompleteModelSchema);