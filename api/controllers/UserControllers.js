
const keys = require('../config/keys');
var models = require('../models');
const User = models.User
const jwtUser = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const ChangePasswordValidation = require('../util/validation/changePassword');


const validateRegisterInput = require('../util/validation/userRegister');
const validateLoginInput = require('../util/validation/userLogin')

exports.UserRegister = (req, res) => {
    const {
        errors,
        isValid
    } = validateRegisterInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const newUser = {
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password
    }

    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (user) {
            return res.status(400).json({
                email: 'Email already exists'
            });
        } else {

            User.create(newUser)
                .then(user => res.json(user))
                .catch(err => console.log(err));

        }
    })
}


exports.UserLogin = (req, res) => {
    const {
        errors,
        isValid
    } = validateLoginInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({
        where: {
            email
        }
    })
        .then(user => {
            // Check for user
            if (!user) {
                return res.status(404).json({
                    email: 'user not found'
                });
            }
            // Check Password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        // user Matched
                        const payload = {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            pictureURL: user.pictureURL

                        }; // Create jwtUser Payload

                        // Sign Token
                        jwtUser.sign(
                            payload,
                            keys.secretOrKey, {
                            expiresIn: 18000
                        },
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: 'Bearer ' + token
                                });
                            }
                        );
                    } else {

                        return res.status(400).json({
                            password: 'Password incorrect'
                        });
                    }
                });
        })
}


exports.UploadPicture = (req, res) => {
    User.findOne({
        where: {
            id: req.body.id
        }
    })
        .then(user => {
            user.update({
                pictureURL: req.file.url

            }).then((user) => {
                res.json(user)
            })
        })
        .catch(err => res.status(404).json({
            image: 'No image found found'
        }));
}

exports.UpdateUser = (req, res) => {
    User.findOne({
        where: {
            id: req.body.id
        }
    })
        .then(user => {
            if (user) {
                user.update({
                    fullName: req.body.fullName,
                    email: req.body.email
                }).then((user) => {
                    res.json(user)
                })
            } else {
                res.status(404).json({
                    user: 'No user found'
                });
            }
        })
        .catch(err => res.status(404).json({
            err: 'profile not updated'
        }));
}


exports.UploadPicture = (req, res) => {
    User.findOne({
        where: {
            id: req.body.id
        }
    })
        .then(user => {
            user.update({
                pictureURL: req.file.url
            }).then((user) => {
                res.json(user)
            })
        })
        .catch(err => res.status(404).json({
            Image: 'No image found'
        }));
}




exports.ReturnUser = (req, res) => {

    res.json({
        id: req.user.id,
        fullName: req.user.fullName,
        email: req.user.email,
        pictureURL: req.user.pictureURL

    });
}

exports.AllUser = (req, res) => {

    User.findAll({
        raw: true
    })
        .then(user => res.json(user))
        .catch(err => res.status(404).json({
            nouserfound: 'No user found'
        }));
}



exports.SoftDelUser = (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        }
    }).then(user => {
        if (user !== null) {
            user.destroy().then(() => {
                res.json({
                    success: true
                })
            }).catch((err) => {
                res.status(404).json({
                    error: 'something went wrong'
                })
            })
        }
    })
}

exports.SoftDelUser2 = (req, res) => {
    User.findOne({
        where: {
            id: req.body.id
        }
    }).then(user => {
        if (user !== null) {
            user.destroy().then(() => {
                res.json({
                    success: true
                })
            }).catch((err) => {
                res.status(404).json({
                    error: 'something went wrong'
                })
            })
        }
    })
}



exports.UndoSoftdelUser = (req, res) => {
    User.findOne({
        where: {
            id: req.params.id,
        },
        paranoid: false
    }).then(user => {
        if (user !== null) {
            user.restore();
            res.json({
                success: true
            })
        } else {
            res.status(404).json({
                nouserfound: 'user not found'
            })
        }
    })
}
exports.RetrieveUserById = (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        },
    })
        .then(user => {
            if (user) { res.json(user) }
            else {
                res.status(404).json({ nouserfound: 'No user found with that ID' })
            }
        }
        )
        .catch(err =>
            res.status(404).json({
                nouserfound: 'No user found'
            })
        );
};

exports.ChangePassword = (req, res) => {


    const {
        errors,
        isValid
    } = ChangePasswordValidation(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const password1 = req.body.password1
    const newUser = {
        password: req.body.password,
    }

    User.findOne({
        where: {
            email: req.body.email,
        }
    })
        .then(User => {


            bcrypt.compare(password1, User.password).then(isMatch => {
                if (isMatch) {
                    // User Matched
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash;
                            -         User.update(newUser)
                                .then(User => res.json(User))
                                .catch(err => console.log(err));
                        })
                    })
                }
            });



        })
};
