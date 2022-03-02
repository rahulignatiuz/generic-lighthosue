const express = require("express");
const router = express.Router();
const lighthouseJson = require('../json/lighthouse');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const LessonField = mongoose.model('LessonField');
const Lesson = mongoose.model('Lesson');
const LessonData = mongoose.model('LessonData');
const Autocomplete = mongoose.model('Autocomplete');
const multer = require('multer');
const MulterAzureStorage = require('multer-azure-storage');

const storage = new MulterAzureStorage({
    azureStorageConnectionString: lighthouseJson.azureStorageConnectionString,
    containerName: lighthouseJson.containerName,
    containerSecurity: 'blob',
    fileName: function (file) {
        //  console.log(file);
        return file.mimetype + '/' + Date.now() + '_' + file.originalname;
    }
});

const upload = multer({ storage: storage });

//http://localhost:6001/api/lessons
router.post("/", (req, res, next) => {
    Lesson.find({ Org: req.body.orgId }, function (err, docs) {
        //console.log("++++++Lesson++ docs+++++", docs.length);
        if (docs.length) {
            //console.log("++++++Data found+++++++", docs);
            var lessonResults = getLessonId(docs);
            lessonResults.then(function (result) {
                if (!err && result) {
                    res.status(200).json({
                        status: true,
                        message: "get successfully.",
                        result: result
                    });

                } else {
                    res.status(200).json({
                        status: false,
                        message: "get error.",
                        result: err
                    });
                }

            });
        } else {
            //console.log("++++++Data not found+++++++", docs);
            res.status(200).json({
                status: false,
                message: "Data not found",
            });
        }
    });
});

async function getLessonId(lesson) {
    var lessonsByID = [];
    return new Promise((resolve, reject) => {
        lesson.forEach((value, index) => {
            LessonData.find({ Lesson: value._id }, function (err, docs) {
                //  //console.log("++++++Lesson++ docs+++++",docs.Value);
                // lessonsByID.push({ LessonId: value._id, Data: docs});
                lessonsByID.push(docs);
                if (index == lesson.length - 1) {
                    return err ? reject(err) : resolve(lessonsByID);
                }
            });

        });
    });
}

//http://localhost:6001/api/lessons/lessonfield
router.post("/lessonfield", (req, res, next) => {
    LessonField.find({ Org: req.body.orgId, Active: true }, function (err, docs) {
        if (!err) {
            // //console.log("++++++autocomplete+++++++", docs);
            res.status(200).json({
                status: true,
                message: "get successfully.",
                result: docs
            });

        } else {
            res.status(200).json({
                status: false,
                message: "get error.",
                result: err
            });
        }
    });
});

//http://localhost:6001/api/lessons/lessonbyid
router.post("/lessonbyid", (req, res, next) => {
    LessonData.find({ Lesson: req.body.lessonID }, function (err, docs) {
        if (!err) {
            // //console.log("++++++autocomplete+++++++", docs);
            res.status(200).json({
                status: true,
                message: "get successfully.",
                result: docs
            });

        } else {
            res.status(200).json({
                status: false,
                message: "get error.",
                result: err
            });
        }
    });
});


//http://localhost:6001/api/lessons/addfield
router.post('/addfield', function (req, res) {
    var results = addField(req.body);
    results.then(function (result) {
        //console.log("++++++++++++attributes+++2++++++++++", result);
        if (result) {
            res.status(200).json({
                status: true,
                message: "Lesson field added successfully.",
                result: result
            });
        } else {
            res.status(200).json({
                status: false,
                message: "Lesson field not added successfully.",
            });
        }
    });
});

async function addField(obj) {
    return new Promise((resolve, reject) => {
        obj.Attributes.forEach((attributes, index) => {
            let lessonField = new LessonField();
            lessonField.Org = obj.OrgID;
            lessonField.CreatedBy = obj.UserID;
            lessonField.Type = attributes.type;
            lessonField.Name = attributes.name;
            lessonField.Label = attributes.label;
            lessonField.Required = attributes.required;
            lessonField.Description = attributes.description;
            lessonField.Placeholder = attributes.placeholder;
            lessonField.Icon = attributes.icon;
            lessonField.ClassName = attributes.className;
            lessonField.Toggle = attributes.toggle;
            lessonField.Active = obj.Active;
            lessonField.Typeoflesson = obj.Typeoflesson;
            lessonField.Checkbox = obj.Checkbox;
            lessonField.Section = obj.Section;
            lessonField.save((error, doc) => {
                if (!error) {
                    if (index == obj.Attributes.length - 1) {
                        return error ? reject(error) : resolve(doc);
                    }
                } else {
                    return error ? reject(error) : resolve(null);
                }
            });
        });
    });
}


//http://localhost:6001/api/lessons/add
router.post("/add", (req, res, next) => {
    //console.log("++++lesson+++++add+++++Autocomplete+++++", req.body.Autocomplete);
    //console.log("++++lesson+++++add+++++Text+++++", req.body.Text);
    let lesson = new Lesson();
    lesson.Org = req.body.OrgID;
    lesson.CreatedBy = req.body.UserID;
    lesson.Active = req.body.Active;
    lesson.Typeoflesson = req.body.Typeoflesson;
    lesson.save((error, docs) => {
        if (!error) {
            saveValue(docs._id, req.body.Autocomplete, req.body.Text, req.body.Textarea, req.body.Input_autocomplete);
            //console.log("++++++autocomplete+++++++", docs);
            res.status(200).json({
                status: true,
                message: "save successfully.",
                result: docs
            });
        } else {
            res.status(200).json({
                status: false,
                message: "save error.",
                result: error
            });
        }
    });
});
async function saveValue(lessonId, autocomplete, text, textarea, input_autocomplete) {
    if (autocomplete) {
        var autoResults = saveAutocomplete(lessonId, autocomplete);
        autoResults.then(function (result) {
            //console.log("++++++autoResults++++++++++++", result);
            LessonData.insertMany(result).then(function () {
                //console.log("Data autoResults inserted");
            }).catch(function (error) {
                //console.log(error);
            });
        });
    }
    if (input_autocomplete) {
        var inputAutoResults = saveInputAutocomplete(lessonId, input_autocomplete);
        inputAutoResults.then(function (result) {
            //console.log("++++++autoResults++++++++++++", result);
            LessonData.insertMany(result).then(function () {
                //console.log("Data autoResults inserted");
            }).catch(function (error) {
                //console.log(error);
            });
        });
    }
    if (text) {
        var textResults = saveText(lessonId, text);
        textResults.then(function (result) {
            //console.log("++++++textResults++++++++++++", result);
            LessonData.insertMany(result).then(function () {
                //console.log("Data textResults inserted");
            }).catch(function (error) {
                //console.log(error);
            });
        });
    }
    if (textarea) {
        var textareaResults = saveTextarea(lessonId, textarea);
        textareaResults.then(function (result) {
            //console.log("++++++textResults++++++++++++", result);
            LessonData.insertMany(result).then(function () {
                //console.log("Data textResults inserted");
            }).catch(function (error) {
                //console.log(error);
            });
        });
    }

}

async function saveAutocomplete(lessonId, autocomplete) {
    var autocompleteData = [];
    return new Promise((resolve, reject) => {
        Object.entries(autocomplete).forEach(async ([key, value], index) => {
            console.log("autocomplete key " + key + " has value " + value + " length " + Object.entries(autocomplete).length);
            Autocomplete.findById(value, function (error, autoDoc) {
                LessonField.findOne({ Name: key }, function (error, fieldDoc) {
                    if (value) {
                        autocompleteData.push({ Lesson: lessonId, Autocomplete: value, Name: key, Value: autoDoc.Name, Label: fieldDoc.Label, Type: 'autocomplete', LessonField: fieldDoc._id, Checkbox: fieldDoc.Checkbox });
                    }
                    //console.log("autocomplete key " + key + " has value " + value + " length " + Object.entries(autocomplete).length);
                    if (index == Object.entries(autocomplete).length - 1) {
                        return resolve(autocompleteData);
                    }
                });
            });
        });
    });
}

async function saveInputAutocomplete(lessonId, input_autocomplete) {
    var inputAutocompleteData = [];
    return new Promise((resolve, reject) => {
        Object.entries(input_autocomplete).forEach(async ([key, value], index) => {
            console.log("inputAutocompleteData value " + value[0]._id);
            console.log("inputAutocompleteData key " + key + " has value " + value[0]._id + " length " + Object.entries(input_autocomplete).length);
            Autocomplete.findById(value[0]._id, function (error, autoDoc) {
                LessonField.findOne({ Name: key }, function (error, fieldDoc) {
                    if (value[0]._id) {
                        inputAutocompleteData.push({ Lesson: lessonId, Autocomplete: value[0]._id, Name: key, Value: autoDoc.Name, Label: fieldDoc.Label, Type: 'input_autocomplete', LessonField: fieldDoc._id, Checkbox: fieldDoc.Checkbox });
                    }
                    //console.log("autocomplete key " + key + " has value " + value + " length " + Object.entries(autocomplete).length);
                    if (index == Object.entries(input_autocomplete).length - 1) {
                        return resolve(inputAutocompleteData);
                    }
                });
            });
        });
    });
}

async function saveText(lessonId, text) {
    var textData = [];
    return new Promise((resolve, reject) => {
        Object.entries(text).forEach(([key, value], index) => {
            LessonField.findOne({ Name: key }, function (error, fieldDoc) {
                //console.log("text key " + key + " has value " + value + " length " + Object.entries(text).length);
                if (value) {
                    textData.push({ Lesson: lessonId, Name: key, Value: value, Label: fieldDoc.Label, Type: 'text', LessonField: fieldDoc._id, Checkbox: fieldDoc.Checkbox });
                }
                if (index == Object.entries(text).length - 1) {
                    return resolve(textData);
                }
            });
        });
    });
}

async function saveTextarea(lessonId, textarea) {
    var textareaData = [];
    return new Promise((resolve, reject) => {
        Object.entries(textarea).forEach(([key, value], index) => {
            console.log("text key " + key + " has value " + value + " length " + Object.entries(textarea).length);
            LessonField.findOne({ Name: key }, function (error, fieldDoc) {
                //  console.log("text key " + key + " has value " + value + " length " + Object.entries(text).length);
                if (value) {
                    textareaData.push({ Lesson: lessonId, Name: key, Value: value, Label: fieldDoc.Label, Type: 'textarea', LessonField: fieldDoc._id, Checkbox: fieldDoc.Checkbox });
                }
                if (index == Object.entries(textarea).length - 1) {
                    return resolve(textareaData);
                }
            });
        });
    });
}

//http://localhost:6001/api/lessons/add/attachment
router.post("/add/attachment", upload.single('Attachment'), (req, res, next) => {

    LessonField.findOne({ Name: req.body.Name }, function (error, fieldDoc) {
        let lessonData = new LessonData();
        lessonData.Lesson = req.body.LessonID;
        lessonData.Name = req.body.Name;
        lessonData.Value = req.file.originalname;
        lessonData.Label = fieldDoc.Label;
        lessonData.AttachmentUrl = req.file.url;
        lessonData.save((err, doc) => {
            if (!err) {
                //console.log("++++++attachment+++++++", doc);
                res.status(200).json({
                    status: true,
                    message: "Attachment  successfully added.",
                    result: doc
                });

            } else {
                res.status(200).json({
                    status: false,
                    message: "Attachment failure.",
                    result: err
                });
            }
        });
    });
});


//http://localhost:6001/api/lessons/update
router.post("/update", (req, res, next) => {
    var update = {
        UpdatedBy: req.body.UserID,
        UpdatedDate: Date.now()
    }
    Lesson.findByIdAndUpdate(req.body.LessonId, update, function (err, docs) {
        if (!err) {
            // updateValue(req.body.LessonId, req.body.Autocomplete, req.body.Text, req.body.Textarea, req.body.Input_autocomplete);
            //console.log("++++++autocomplete+++++++", docs);
            updateValue(req.body);
            res.status(200).json({
                status: true,
                message: "save successfully.",
                result: docs
            });
        } else {
            res.status(200).json({
                status: false,
                message: "save error.",
                result: err
            });
        }
    });

});

async function updateValue(obj) {
    if (obj.Autocomplete) {
        updateAutocomplete(obj.LessonId, obj.Autocomplete);
    }
    if (obj.Input_autocomplete) {
        updateInputAutocomplete(obj.LessonId, obj.Input_autocomplete);
    }
    if (obj.Text) {
        updateText(obj.LessonId, obj.Text);
    }
    if (obj.Textarea) {
        updateTextarea(obj.LessonId, obj.Textarea);
    }
}

async function updateAutocomplete(lessonId, autocomplete) {
    return new Promise((resolve, reject) => {
        Object.entries(autocomplete).forEach(async ([key, value], index) => {
            console.log("autocomplete key " + key + " has value " + value + " length " + Object.entries(autocomplete).length);
            Autocomplete.findById(value, function (error, autoDoc) {
                if (value) {
                    //  updateFieldAutocomplete(lessonId, key, value, autoDoc.Name)
                    LessonData.updateMany({ Lesson: lessonId, Name: key }, { Autocomplete: value, Value: autoDoc.Name }, function (err, docs) {
                        console.log("Data autoResults inserted", docs);
                    }).catch(function (err) {
                        console.log(err);
                    });
                }
                if (index == Object.entries(autocomplete).length - 1) {
                    return resolve();
                }
            });
        });
    });
}

async function updateInputAutocomplete(lessonId, input_autocomplete) {
    //   var inputAutocompleteData = [];
    return new Promise((resolve, reject) => {
        Object.entries(input_autocomplete).forEach(async ([key, value], index) => {
            console.log("inputAutocompleteData key " + key + " has value " + value + " length " + Object.entries(input_autocomplete).length);
            Autocomplete.findById(value, function (error, autoDoc) {
                if (value) {
                    //   inputAutocompleteData.push({ Lesson: lessonId, Autocomplete: value, Name: key, Value: autoDoc.Name, Label: fieldDoc.Label, Type: 'input_autocomplete', LessonField: fieldDoc._id });
                    LessonData.updateMany({ Lesson: lessonId, Name: key }, { Autocomplete: value, Value: autoDoc.Name }, function (err, docs) {
                        console.log("Data input_autocomplete inserted", docs);
                    }).catch(function (err) {
                        console.log(err);
                    });
                }
                //console.log("autocomplete key " + key + " has value " + value + " length " + Object.entries(autocomplete).length);
                if (index == Object.entries(input_autocomplete).length - 1) {
                    return resolve();
                }

            });
        });
    });
}

async function updateText(lessonId, text) {
    //  var textData = [];
    return new Promise((resolve, reject) => {
        Object.entries(text).forEach(([key, value], index) => {
            //console.log("text key " + key + " has value " + value + " length " + Object.entries(text).length);
            if (value) {
                //        textData.push({ Lesson: lessonId, Name: key, Value: value, Label: fieldDoc.Label, Type: 'text', LessonField: fieldDoc._id });
                LessonData.updateMany({ Lesson: lessonId, Name: key }, { Value: value }, function (err, docs) {
                    console.log("Data text inserted", docs);
                }).catch(function (err) {
                    console.log(err);
                });
            }
            if (index == Object.entries(text).length - 1) {
                return resolve();
            }

        });
    });
}

async function updateTextarea(lessonId, textarea) {
    //  var textareaData = [];
    return new Promise((resolve, reject) => {
        Object.entries(textarea).forEach(([key, value], index) => {
            console.log("text key " + key + " has value " + value + " length " + Object.entries(textarea).length);
            //  console.log("text key " + key + " has value " + value + " length " + Object.entries(text).length);
            if (value) {
                //     textareaData.push({ Lesson: lessonId, Name: key, Value: value, Label: fieldDoc.Label, Type: 'textarea', LessonField: fieldDoc._id });
                LessonData.updateMany({ Lesson: lessonId, Name: key }, { Value: value }, function (err, docs) {
                    console.log("Data textarea inserted", docs);
                }).catch(function (err) {
                    console.log(err);
                });
            }
            if (index == Object.entries(textarea).length - 1) {
                return resolve();
            }
        });

    });
}


//http://localhost:6001/api/lessons/alllessonfield
router.post("/alllessonfield", (req, res, next) => {
    // //console.log(Model.getAllKeywordsSQL());
    // User.find({ UserVerified: true }, function (err, docs) {
    LessonField.find({ Org: req.body.orgId }).exec(function (err, docs) {
        if (!err) {
            if (docs && docs.length > 0) {
                res.status(200).json({
                    status: true,
                    message: "user get successfully.",
                    result: docs
                });
            } else {
                res.status(200).json({
                    status: false,
                    message: "user not get.",
                    result: err
                });
            }
        }

    });

});

//http://localhost:6001/api/lessons/updatelessonfield
router.post('/updatelessonfield/:id', (req, res) => {
    //console.log("+++++++++++++++++++updatelessonfield+++++++++++", req.body.Required);
    LessonField.findOne({ _id: req.params.id })
        .then(LessonField => {
            LessonField.Required = req.body.Required;
            LessonField.Label = req.body.Label;
            LessonField.ParentLessonField = req.body.Parent;
            LessonField.UpdatedBy = req.body.UserID;
            LessonField.UpdatedDate = Date.now();
            LessonField.Checkbox = req.body.Checkbox;
            LessonField.Section = req.body.Section;
            LessonField.save((err, results) => {
                if (err) {
                    //console.log(err)
                    res.send({ status: false, result: results, message: 'not-create' });
                } else {
                    //console.log(results)
                    return res.send({ status: true, data: results, message: 'create' });
                }
            })

        });
});
//delete 
//http://localhost:6001/api/lessons/deletelessonfield/delete
router.post('/deletelessonfield/delete', function (req, res) {
    LessonField.findByIdAndRemove(req.body._id, function (err) {
        //console.log(req.body._id)
        if (!err) {
            res.status(200).json({
                status: true,
                message: "lessonfield deleted successfully."
            });
        } else {
            res.status(200).json({
                status: false,
                message: "lessonfield not delete successfully."
            });
        }
    });
});
//http://localhost:6001/api/lessons/alllessonfieldforproject
router.post("/alllessonfieldforproject", (req, res, next) => {
    // console.log(Model.getAllKeywordsSQL());
    // User.find({ UserVerified: true }, function (err, docs) {
    LessonField.find({ Org: req.body.orgId, Typeoflesson: 'Project', lessontype: req.body.Section }).exec(function (err, docs) {
        //  console.log('-----------------------',docs)
        if (!err) {
            if (docs && docs.length > 0) {
                res.status(200).json({
                    status: true,
                    message: "user get successfully.",
                    result: docs
                });
            } else {
                res.status(200).json({
                    status: false,
                    message: "user not get.",
                    result: err
                });
            }
        }

    });

});
//http://localhost:6001/api/lessons/alllessonfield
router.post("/alllessonfieldforprocess", (req, res, next) => {
    // console.log(Model.getAllKeywordsSQL());
    // User.find({ UserVerified: true }, function (err, docs) {
    LessonField.find({ Org: req.body.orgId, Typeoflesson: 'Process' }).exec(function (err, docs) {
        //  console.log('-----------------------',docs)
        if (!err) {
            if (docs && docs.length > 0) {
                res.status(200).json({
                    status: true,
                    message: "user get successfully.",
                    result: docs
                });
            } else {
                res.status(200).json({
                    status: false,
                    message: "user not get.",
                    result: err
                });
            }
        }

    });

});
//http://localhost:6001/api/lessons/updatelessonfieldcheckbox
router.post('/updatelessonfieldcheckbox', (req, res) => {
    //console.log("+++++++++++++++++++updatelessonfield+++++++++++", req.body.Required);
    LessonData.findOne({ Name: req.body.Name })
        .then(LessonData => {
            LessonData.Checkbox = req.body.Checkbox;
            LessonData.save((err, results) => {
                if (err) {
                    //console.log(err)
                    res.send({ status: false, result: results, message: 'not-create' });
                } else {
                    //console.log(results)
                    return res.send({ status: true, data: results, message: 'create' });
                }
            })

        });
});

//http://localhost:6001/api/lessons/updatecheckboxlessonfield
router.post('/updatecheckboxlessonfield', (req, res) => {
    //console.log("+++++++++++++++++++updatelessonfield+++++++++++", req.body.Required);
    var update = { Checkbox: req.body.Checkbox }
    LessonField.findByIdAndUpdate(req.body.LessonFiedID, update, function (err, results) {
        if (err) {
            //console.log(err)
            res.send({ status: false, result: err, message: 'not-update' });
        } else {
            //console.log(results)
            return res.send({ status: true, data: results, message: 'update' });
        }
    });
});

// http://localhost:6001/api/lessons/updatelessonfieldLabel
router.post('/updatelessonfieldLabel', (req, res) => {

    LessonData.findOne({ Name: req.body.Name })
        .then(LessonData => {
            LessonData.Label = req.body.Label;
            LessonData.save((err, results) => {
                if (err) {
                    //console.log("+++++++++++++++++++updatelessonfield+++++++++++", err);
                    console.log(err)
                    res.send({ status: false, result: results, message: 'not-create' });
                } else {
                    //console.log(results)
                    return res.send({ status: true, data: results, message: 'create' });
                }
            })

        });
});

// http://localhost:6001/api/lessons/updatelessondatasvalueformasterlist
router.post('/updatelessondatasvalueformasterlist', (req, res) => {
    //console.log("+++++++++++++++++++updatelessonfield+++++++++++", req.body.Required);
    LessonData.findOne({ Autocomplete: req.body.Autocomplete })
        .then(LessonData => {
            LessonData.Value = req.body.Value;
            LessonData.save((err, results) => {
                if (err) {
                    //console.log(err)
                    res.send({ status: false, result: results, message: 'not-create' });
                } else {
                    //console.log(results)
                    return res.send({ status: true, data: results, message: 'create' });
                }
            })
        });
});
module.exports = router;