var express = require("express");
const router = express.Router();
const { google } = require('googleapis');
const fetch = require('node-fetch');
const lighthouseJson = require('../json/lighthouse');
var nodemailer = require('nodemailer');
var fs = require('fs');
const mongoose = require('mongoose');
const User = mongoose.model('User');

const CLIENT_ID = lighthouseJson.CLIENT_ID;
const CLIENT_SECRET = lighthouseJson.CLIENT_SECRET;
const REDIRECT_URL = lighthouseJson.REDIRECT_URL;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

var transport = nodemailer.createTransport({
    host: lighthouseJson.SMTP_HOST,
    port: lighthouseJson.SMTP_POST,
    secure: lighthouseJson.SMTP_SECURE,
    auth: {
        user: lighthouseJson.SMTP_USER,
        pass: lighthouseJson.SMTP_PASSWORD
    }
});

//handles url http://localhost:6001/api/login/google
router.get('/google', (req, res) => {
    const scope = [
        //'https://www.googleapis.com/auth/gmail.readonly'
        'https://www.googleapis.com/auth/plus.me', // request access here
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile'
    ];
    // Generate an OAuth URL and redirect there
    const url = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scope
    });
    // res.redirect(url);
    res.status(200).json({
        url: url
    });

});

router.get('/auth/google/callback', function (req, res) {
    const code = req.query.code;
    console.log('Labels:', code);
    if (code) {
        // Get an access token based on our OAuth code
        oAuth2Client.getToken(code, function (err, tokens) {
            if (!err) {
                oAuth2Client.setCredentials(tokens);
                let url = lighthouseJson.GOOGLE_USER_INFO + tokens.access_token;
                fetch(url, { method: "Get" }).then(res => res.json()).then((json) => {
                    // do something with JSON
                    const email = json.email;
                    const address = email.split('@').pop();
                    const allowDomain = lighthouseJson.ALLOW_DOMAIN;
                    const loginDomain = [address];
                    console.log(findCommonEmailDomain(allowDomain, loginDomain));
                    console.log(address);
                    if (findCommonEmailDomain(allowDomain, loginDomain)) {
                        let baseUrl = lighthouseJson.BASE_URL;
                        User.findOne({ Email: email }).populate('Org', 'Name SubDomainName').then(user => {
                            if (user) {
                                if(user.Org){
                                    baseUrl = user.Org.SubDomainName;
                                }
                                if (user.Sub) {
                                    if (user.Active) {
                                        user.Picture = json.picture;
                                        user.save((err, doc) => {
                                            if (!err) {
                                                res.redirect(baseUrl + "/#/social-auth?email=" + json.email);
                                            } else {
                                                res.redirect(baseUrl + "/#/social-auth?email=" + json.email);
                                            }
                                        });
                                    } else {
                                        res.redirect(baseUrl + "/#/social-auth?inactive=" + json.email);
                                    }

                                } else {
                                    user.Sub = json.sub;
                                    user.Picture = json.picture;
                                    user.EmailVerified = json.email_verified;
                                    user.Hd = json.hd;

                                    user.save((err, doc) => {

                                        if (err) {
                                            res.status(200).json({
                                                status: false,
                                                message: "user not added successfully.",
                                                result: err
                                            });
                                        } else {

                                            res.redirect(baseUrl + "/#/social-auth?email=" + json.email);
                                        }
                                    });

                                }
                            } else {
                                User.count({}, function (err, count) {
                                    if (!count) {
                                        console.log("Number of users:", count);
                                        var user = new User();
                                        user.FirstName = json.given_name;
                                        user.LastName = json.family_name;
                                        user.Email = json.email;
                                        user.Sub = json.sub;
                                        user.Picture = json.picture;
                                        user.EmailVerified = json.email_verified;
                                        user.Hd = json.hd;
                                        user.Roles.push({ Roleid: 4, RoleName: "sa" });
                                        user.Active = true;
                                        user.save((error, doc) => {

                                            if (!error) {
                                                res.redirect(lighthouseJson.BASE_URL + "/#/social-auth?email=" + json.email);
                                            }
                                        });

                                    } else {
                                        res.redirect(lighthouseJson.BASE_URL + "/#/social-auth?account-exist=" + json.email + "&access-token=" + tokens.access_token);
                                    }

                                });

                            }
                        });
                    } else {
                        res.redirect(lighthouseJson.BASE_URL + "/#/social-auth?outer-domain-email=" + json.email);
                    }
                });
            }
        });
    }
});

function findCommonEmailDomain(allowDomain, loginDomain) {
    return allowDomain.some(item => loginDomain.includes(item))
}
//handles url http://localhost:6001/api/login/google/auth
router.post('/google/auth', function (req, res) {
    User.findOne({ Email: req.body.email }).populate('Org', 'Name LogoPath').exec(function (err, docs) {
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
                result: docs
            });
        }

    });
});

module.exports = router;