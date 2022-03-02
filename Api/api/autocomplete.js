const express = require("express");
const router = express.Router();
const lighthouseJson = require('../json/lighthouse');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const LessonField = mongoose.model('LessonField');
const Autocomplete = mongoose.model('Autocomplete');

//http://localhost:6001/api/autocomplete
router.post("/", (req, res, next) => {
    var type = ['autocomplete', 'input_autocomplete'];
    LessonField.find({ Type: { $in: type }, Org: req.body.orgId }, function (err, docs) {
        if (!err) {
            // console.log("++++++autocomplete+++++++", docs);
            res.status(200).json({
                status: true,
                message: "autocomplete get successfully.",
                result: docs
            });

        } else {
            res.status(200).json({
                status: false,
                message: "autocomplete not get.",
                result: err
            });
        }
    });
});
//http://localhost:6001/api/autocomplete/autocompleteforproject
router.post("/autocompleteforproject", (req, res, next) => {
    var type = ['autocomplete', 'input_autocomplete'];
    LessonField.find({ Type: { $in: type }, Org: req.body.orgId, Typeoflesson: 'Project' }, function (err, docs) {
        if (!err) {
            // console.log("++++++autocomplete+++++++", docs);
            res.status(200).json({
                status: true,
                message: "autocomplete get successfully.",
                result: docs
            });

        } else {
            res.status(200).json({
                status: false,
                message: "autocomplete not get.",
                result: err
            });
        }
    });
});
//http://localhost:6001/api/autocomplete/autocompleteforprocess
router.post("/autocompleteforprocess", (req, res, next) => {
    var type = ['autocomplete', 'input_autocomplete'];
    LessonField.find({ Type: { $in: type }, Org: req.body.orgId, Typeoflesson: 'Process' }, function (err, docs) {
        if (!err) {
            // console.log("++++++autocomplete+++++++", docs);
            res.status(200).json({
                status: true,
                message: "autocomplete get successfully.",
                result: docs
            });

        } else {
            res.status(200).json({
                status: false,
                message: "autocomplete not get.",
                result: err
            });
        }
    });
});
//http://localhost:6001/api/autocomplete/element
router.get("/element", (req, res, next) => {
    //  console.log("++++++element+++++++", req.body.parentIds);
    Autocomplete.find({ ParentLessonFieldElement: null }, function (err, docs) {
        if (!err) {
            //  console.log("++++++element+++++++", docs);
            res.status(200).json({
                status: true,
                message: "autocomplete get successfully.",
                result: docs
            });

        } else {
            res.status(200).json({
                status: false,
                message: "autocomplete not get.",
                result: err
            });
        }
    });
});


//http://localhost:6001/api/autocomplete/add
router.post("/add", (req, res, next) => {
    //  console.log("++++++autocomplete+++++++",req.body.ParentField);
    let autocom = new Autocomplete();
    autocom.LessonField = req.body.SelectType;
    autocom.ParentLessonFieldElement = req.body.ParentField;
    autocom.Name = req.body.Name;
    autocom.CreatedBy = req.body.UserID;
    autocom.Active = req.body.Active;
    autocom.save((err, doc) => {
        if (!err) {
            // console.log("++++++autocomplete+++++++",doc);
            res.status(200).json({
                status: true,
                message: "autocomplete  successfully added.",
                result: doc
            });

        } else {
            res.status(200).json({
                status: false,
                message: "autocomplete failure.",
                result: err
            });
        }
    });
});


//http://localhost:6001/api/autocomplete/get/selected
router.post("/get/selected", (req, res, next) => {
    // console.log("++++++selected+++++++",req.body.tabID);
    Autocomplete.find({ LessonField: req.body.tabID }, function (err, docs) {
        if (!err) {

            res.status(200).json({
                status: true,
                message: "autocomplete  successfully added.",
                result: docs
            });

        } else {
            res.status(200).json({
                status: false,
                message: "autocomplete failure.",
                result: err
            });
        }
    });
});

//http://localhost:6001/api/autocomplete/get/field/parent
router.post("/get/field/parent", (req, res, next) => {
    LessonField.findById(req.body.lfID).exec(function (err, docs) {
        if (!err) {
            if (docs.ParentLessonField) {
                //    console.log("++++++++++++++++++field+++++get+++++++++++++", docs.ParentLessonField);
                var field = getField(docs.ParentLessonField);
                field.then(function (result) {
                    res.status(200).json({
                        status: true,
                        message: "field get successfully.",
                        result: result
                    });
                });
            } else {
                //   console.log("++++++++++++++++++field++++++not++++++++++++", docs);
                res.status(200).json({
                    status: false,
                    message: "field not get."
                });
            }
        } else {
            res.status(200).json({
                status: false,
                message: "field not get.",
                result: err
            });
        }

    });

});

async function getField(fieldId) {
    return new Promise((resolve, reject) => {
        LessonField.findById(fieldId, function (err, docs) {
            //  //console.log("++++++Lesson++ docs+++++",docs.Value);
            if (!err) {
                return err ? reject(err) : resolve(docs);
            } else {
                return err ? reject(err) : reject(err);
            }
        });
    });
}



//http://localhost:6001/api/autocomplete/get/selected/
router.post("/get/selected/parent", (req, res, next) => {
    // console.log("++++++selected+++++++",req.body.tabID);
    Autocomplete.find({ LessonField: req.body.tabID }, function (err, docs) {
        if (!err) {

            res.status(200).json({
                status: true,
                message: "autocomplete  successfully added.",
                result: docs
            });

        } else {
            res.status(200).json({
                status: false,
                message: "autocomplete failure.",
                result: err
            });
        }
    });
});

//http://localhost:6001/api/autocomplete/get/field/and/parent
router.post("/get/field/and/parent", (req, res, next) => {
    // console.log("++++++selected+++++++",req.body.tabID);
    Autocomplete.find({ LessonField: req.body.lfID, ParentLessonFieldElement: req.body.plfId }, function (err, docs) {
        if (!err) {
            res.status(200).json({
                status: true,
                message: "autocomplete  successfully added.",
                result: docs
            });

        } else {
            res.status(200).json({
                status: false,
                message: "autocomplete failure.",
                result: err
            });
        }
    });
});

//http://localhost:6001/api/autocomplete/get/parent
router.post("/get/parent", (req, res, next) => {
    //   console.log("++++++selected++get_parent+++++",req.body.plfId);
    Autocomplete.find({ ParentLessonFieldElement: req.body.plfId }, function (err, docs) {
        if (!err) {
            res.status(200).json({
                status: true,
                message: "autocomplete  successfully added.",
                result: docs
            });

        } else {
            res.status(200).json({
                status: false,
                message: "autocomplete failure.",
                result: err
            });
        }
    });
});

//http://localhost:6001/api/autocomplete/getfield
router.post("/getfield", (req, res, next) => {
    var type = ['autocomplete', 'input_autocomplete'];
    LessonField.find({ Type: { $in: type }, ParentLessonField: { $ne: req.body.lfId }, _id: { $ne: req.body.lfId }, Org: req.body.orgId }, function (err, docs) {
        if (!err) {
            // console.log("++++++autocomplete+++++++", docs);
            res.status(200).json({
                status: true,
                message: "autocomplete get successfully.",
                result: docs
            });

        } else {
            res.status(200).json({
                status: false,
                message: "autocomplete not get.",
                result: err
            });
        }
    });
});
//http://localhost:6001/api/autocomplete/updatemasterlistlessonfield
router.post('/updatemasterlistlessonfield/:id', (req, res) => {
    //console.log("+++++++++++++++++++updatelessonfield+++++++++++", req.body.Required);
    Autocomplete.findOne({ _id: req.params.id })
        .then(Autocomplete => {
            Autocomplete.Name = req.body.Name;
            Autocomplete.ParentLessonField = req.body.Parent;
            Autocomplete.save((err, results) => {
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
//http://localhost:6001/api/autocomplete/get/selectedselectedforprocess
router.post("/get/selectedforprocess", (req, res, next) => {
    // console.log("++++++selected+++++++",req.body.tabID);
    Autocomplete.find({ LessonField: req.body.tabID, Typeoflesson: 'Process' }, function (err, docs) {
        if (!err) {

            res.status(200).json({
                status: true,
                message: "autocomplete  successfully added.",
                result: docs
            });

        } else {
            res.status(200).json({
                status: false,
                message: "autocomplete failure.",
                result: err
            });
        }
    });
});

module.exports = router;