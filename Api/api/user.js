var express = require("express");
const router = express.Router();
const lighthouseJson = require('../json/lighthouse');
var nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const User = mongoose.model('User');

var transport = nodemailer.createTransport({
    host: lighthouseJson.SMTP_HOST,
    port: lighthouseJson.SMTP_POST,
    secure: lighthouseJson.SMTP_SECURE,
    auth: {
        user: lighthouseJson.SMTP_USER,
        pass: lighthouseJson.SMTP_PASSWORD
    }
});
//http://localhost:6001/api/user
router.post("/", (req, res, next) => {
    // User.find({UserVerified: true, Org:orgId}, function (err, docs) {
    let orgId = req.body.orgId;
    User.find({ Org: orgId, Roles: { $not: { $elemMatch: { RoleName: 'sa' } } } }, function (err, docs) {
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
//http://localhost:6001/api/user/superadmin
router.get("/superadmin", (req, res, next) => {
    // console.log(Model.getAllKeywordsSQL());
    // User.find({ UserVerified: true }, function (err, docs) {
    User.find({ Roles: { $elemMatch: { RoleName: 'sa' } } }).populate('Org', 'Name').exec(function (err, docs) {
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

//http://localhost:6001/api/user/register
router.post('/register', function (req, res) {
    let roleName;
    let user = new User();
    user.Org = req.body.Org;
    user.CreatedBy = req.body.UserID;
    user.FirstName = req.body.FirstName;
    user.LastName = req.body.LastName;
    user.Email = req.body.Email;
    if (req.body.Roles == 1) {
        roleName = "admin";
    } else if (req.body.Roles == 2) {
        roleName = "pm";
    } else if (req.body.Roles == 3) {
        roleName = "user";
    } else {
        roleName = "sa";
    }
    user.Roles.push({ Roleid: req.body.Roles, RoleName: roleName });
    user.OrgAdmin = req.body.OrgAdmin;
    user.Active = req.body.Active;
    user.save((err, doc) => {
        if (err) {
            res.status(200).json({
                status: false,
                message: "user not added successfully.",
                result: err
            });
        } else {
            res.status(200).json({
                status: true,
                message: "user added successfully.",
                result: doc
            });
        }

    });
});
//http://localhost:6001/api/user/account/settings
router.post('/account/settings', function (req, res) {
    let roleName;
    let roleId;
    if (req.body.SettRoles == 1) {
        roleId = 1;
        roleName = "admin";
    } else if (req.body.SettRoles == 2) {
        roleId = 2;
        roleName = "pm";
    } else if (req.body.SettRoles == 3) {
        roleId = 3;
        roleName = "user";
    } else if (req.body.SettRoles == 4) {
        roleId = 4;
        roleName = "sa";
    }else {
        roleId = 4;
        roleName = "sa";
    }
    const update = {
        FirstName: req.body.SettFirstName,
        LastName: req.body.SettLastName,
        Active: req.body.Status,
        UpdatedBy: req.body.UserID,
        UpdatedDate: Date.now(),
        Org: req.body.Org,
        $set: {
            Roles: [{
                Roleid: roleId,
                RoleName: roleName
            }]
        }
    };
    User.findByIdAndUpdate(req.body.SettingUserID, update, (error, doc) => {
        if (error) {
           // console.log("++++++++++++++++err+++++++++++", err);
            res.status(200).json({
                status: false,
                message: "user not update.",
                result: err
            });
        } else {
          //  console.log("++++++++++++++++doc+++++++++++", doc._id);
            res.status(200).json({
                status: true,
                message: "user update successfully.",
                result: doc
            });
        }
    });

});

//http://localhost:6001/api/user/account/delete
router.post('/account/delete', function (req, res) {
    User.findByIdAndRemove(req.body.UserID , function (err) {
        if (!err) {
            res.status(200).json({
                status: true,
                message: "User delete successfully."
            });
        } else {
            res.status(200).json({
                status: false,
                message: "User not delete successfully."
            });
        }
    });
});

//http://localhost:6001/api/user/email
router.post('/email', function (req, res) {
    User.findOne({ _id: req.body.userid }, function (err, docs) {
        if (err) {
            console.log(err)
        }else {
            console.log("Result : ", docs);
            let subject = "Organization created";
            let template = "Organization created";
            var send = sendEmail(docs.Email, subject, template);
            send.then(function (org) {
                if (org) {
                    return res.send({ status: true, data: org, message: 'email send' });
                } else {
                    return res.send({ status: false, message: 'not-send email' });
                }
            });
        }
    });
});

async function sendEmail(to, subject, template) {
    return new Promise((resolve, reject) => {
        var mailOptions = {
            from: lighthouseJson.SMTP_USER,
            to: to,
            subject: subject,
            html: template
        };
        transport.sendMail(mailOptions, function (error, info) {
            if (!error) {
                return error ? reject(error) : resolve(info);
            } else {
                return error ? reject(error) : resolve(null);
            }
        });
    });
}

module.exports = router;