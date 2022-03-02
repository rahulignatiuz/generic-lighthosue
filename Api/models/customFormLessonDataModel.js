const mongoose = require('mongoose');

var customFormLessonDataSchema = new mongoose.Schema({
    LessonField: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "LessonField"
    },
    Lesson: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lesson"
    },
    Autocomplete: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Autocomplete"
    },
    Type: {
        type: String
    },
    Name: {
        type: String
    },
    Value: {
        type: String
    },
    Label: {
        type: String
    },
    AttachmentUrl: {
        type: String
    },
    Checkbox: {
        type: Boolean,
        default: false
    }
});

mongoose.model('LessonData', customFormLessonDataSchema);