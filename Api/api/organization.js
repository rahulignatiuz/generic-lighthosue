var express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Organization = mongoose.model('Organization');
const User = mongoose.model('User');
var multer = require('multer');
var path = require('path');
var fs = require('fs');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = 'uploads'
        if (!fs.existsSync(dir)) {
            fs.mkdir(dir, err => cb(err, dir))
        } else {
            cb(null, dir)
        }
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname.split(".").slice(0, -1).join('.') + "_" + Date.now() + path.extname(file.originalname))
    }
});
var upload = multer({ storage: storage });

//http://localhost:6001/api/organization
router.get("/", (req, res, next) => {
    // console.log(Model.getAllKeywordsSQL());
    User.find({ OrgAdmin: true }).populate('Org', 'Name SubDomainName LogoPath').exec(function (err, docs) {
        if (!err) {
            if (docs && docs.length > 0) {
                res.status(200).json({
                    status: true,
                    message: "Organization get successfully.",
                    result: docs
                });
            } else {
                res.status(200).json({
                    status: false,
                    message: "Organization not get.",
                    result: err
                });
            }
        }
    });
});
//http://localhost:6001/api/organization/orgid
router.post("/orgid", (req, res, next) => {
    // console.log(Model.getAllKeywordsSQL());
    Organization.findById(req.body.orgId, function (err, docs) {

        if (!err) {
            //  console.log("+++++++++++++++findById++++++++++++++++", docs);
            res.status(200).json({
                status: true,
                message: "Organization get successfully.",
                result: docs
            });
        } else {
            res.status(200).json({
                status: false,
                message: "Organization not get.",
                result: err
            });
        }

    });
});

//http://localhost:6001/api/organization/add
router.post("/add", (req, res, next) => {
    let organization = new Organization();
    organization.CreatedBy = req.body.UserID;
    organization.Name = req.body.Name;
    organization.SubDomainName = req.body.SubDomainName;
    organization.Active = req.body.Active;
    organization.save((err, doc) => {
        if (!err) {
            var userAdd = saveOrgUser(doc._id, req.body.Name, req.body.Email, req.body.UserID);
            userAdd.then(function (user) {
                if (user) {
                    res.status(200).json({
                        status: true,
                        message: "Organization add successfully.",
                        result: doc
                    });
                } else {
                    res.status(200).json({
                        status: false,
                        message: "Organization not added.",
                        result: err
                    });
                }

            });
        } else {
            console.log("+++++++++add err+++++++", err);
        }
    });
});
async function saveOrgUser(orgid, name, email, createdby) {
    return new Promise((resolve, reject) => {
        let user = new User();
        user.Org = orgid;
        user.CreatedBy = createdby;
        user.FirstName = name;
        user.Email = email;
        user.Roles.push({ Roleid: 1, RoleName: 'admin' });
        user.OrgAdmin = true;
        user.Active = true;
        user.save((err, doc) => {
            if (!err) {
                return err ? reject(err) : resolve(doc._id);
            } else {
                Organization.remove({ _id: orgid }, function (err) {
                    //console.log("Delete", data);
                    return err ? reject(err) : resolve(null);
                });

            }
        });
    });
}
//http://localhost:6001/api/organization/logo
router.post("/logo", upload.single('File'), (req, res, next) => {
    let fileName = req.file.filename;
    let filePath = req.file.path;
    const update = {
        LogoPath: filePath
    }
    Organization.findByIdAndUpdate(req.body.OrgId, update, (error, doc) => {
        if (error) {
            res.status(200).json({
                status: false,
                message: "Org logo not update.",
                result: err
            });
        } else {
            res.status(200).json({
                status: true,
                message: "Org logo update successfully.",
                result: doc
            });
        }

    });
});

//http://localhost:6001/api/organization/update
router.post("/update", (req, res, next) => {
    const update = {
        FirstName: req.body.Name,
        Email: req.body.Email,
        Active: req.body.Status,
        UpdatedBy: req.body.UserID,
        UpdatedDate: Date.now()
    }
    User.findByIdAndUpdate(req.body.OrgId, update, (error, doc) => {
        var updateOrg = updateOrgUser(doc.Org, req.body.Name, req.body.SubDomainName, req.body.UserID);
        updateOrg.then(function (org) {
            if (!error && org) {
                res.status(200).json({
                    status: true,
                    message: "Org update successfully.",
                    result: org
                });
            } else {
                res.status(200).json({
                    status: false,
                    message: "Org not update.",
                    result: error
                });
            }
        });

    });
});
async function updateOrgUser(orgid, name, subDomainName, updatedBy) {
    return new Promise((resolve, reject) => {
        const update = {
            Name: name,
            SubDomainName: subDomainName,
            UpdatedBy: updatedBy,
            UpdatedDate: Date.now()
        }
        Organization.findByIdAndUpdate(orgid, update, (error, doc) => {
            if (!error) {
                return error ? reject(error) : resolve(doc);
            } else {
                return error ? reject(error) : resolve(null);
            }
        });
    });
}
//http://localhost:6001/api/organization/remove
router.post('/remove', function (req, res) {
    let removeing = removeOrg(req.body.orgId);
    removeing.then(function (removed) {
        if (removed) {
            res.status(200).json({
                status: true,
                message: "Org delete successfully."
            });
        } else {
            res.status(200).json({
                status: false,
                message: "Org not delete successfully."
            });
        }
    });

});
async function removeOrg(id) {
    return new Promise((resolve, reject) => {
        User.deleteMany({ Org: id }, function (error) {
            if (!error) {
                Organization.remove({ _id: id }, function (err) {
                    return error ? reject(error) : resolve(true);
                });
            } else {
                return error ? reject(error) : resolve(null);
            }
        });
    });
}
module.exports = router;