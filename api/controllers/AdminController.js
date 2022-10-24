var models = require('../models');
const Admin = models.Admin
const bcrypt = require('bcryptjs')
const jwtAdmin = require('jsonwebtoken');
const keys = require('../config/keys');
const validateLoginInput = require('../util/validation/adminLogin')
const validateRegisterInput = require('../util/validation/adminRegister');
const ChangePasswordValidation = require('../util/validation/changePassword');


exports.AdminRegister = (req, res) => {

    const {
        errors,
        isValid
    } = validateRegisterInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newAdmin = {
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password
    }
    Admin.findOne({
        where: {
            email: req.body.email
        }
    }).then(admin => {
        if (admin) {
            return res.status(400).json({ email: 'Email already exists' });
        } else {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newAdmin.password, salt, (err, hash) => {
                    if (err) throw err;
                    newAdmin.password = hash;
                    -         Admin.create(newAdmin)
                        .then(admin => res.json(admin))
                        .catch(err => console.log(err));
                })
            })
        }
    })
}

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
    const newAdmin = {
        password: req.body.password,
    }

    Admin.findOne({
        where: {
            email: req.body.email,
        }
    })
        .then(admin => {


            bcrypt.compare(password1, admin.password).then(isMatch => {
                if (isMatch) {
                    // admin Matched
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newAdmin.password, salt, (err, hash) => {
                            if (err) throw err;
                            newAdmin.password = hash;
                            -         admin.update(newAdmin)
                                .then(admin => res.json(admin))
                                .catch(err => console.log(err));
                        })
                    })
                }
            });



        })
};

exports.AdminLogin = (req, res) => {

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
    Admin.findOne({
        where: {
            email
        }
    })
        .then(admin => {
            // Check for user
            if (!admin) {
                return res.status(404).json({ email: 'User not found' });
            }
            // Check Password
            bcrypt.compare(password, admin.password).then(isMatch => {
                if (isMatch) {
                    // admin Matched
                    const payload = {
                        id: admin.id,
                        name: admin.name,
                        email: admin.email
                    }; // Create jwtAdmin Payload

                    // Sign Token
                    jwtAdmin.sign(
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

                    return res.status(400).json({ password: 'Password incorrect' });
                }
            });
        }).catch(err => res.status(404).json({
            noadminfound: 'No admin found'
        }));
}

exports.ReturnAdmin = (req, res) => {
    console.log(req)

    res.json({
        id: req.admin.id,
        fullName: req.admin.fullName,
        email: req.admin.email

    });

}


exports.AllAdmin = (req, res) => {

    Admin.findAll({
        raw: true
    })
        .then(admin => res.json(admin))
        .catch(err => res.status(404).json({
            noadminfound: 'No admin found'
        }));
}


exports.SoftDelAdmin = (req, res) => {
    Admin.findOne({
        where: {
            id: req.params.id
        }
    }).then(admin => {
        if (admin !== null) {
            admin.destroy().then(() => {
                res.json({
                    success: true
                })
            }).catch((err) => {
                res.status(404).json({
                    error: 'something went wrong'
                })
            })
        }
        else {
            res.status(404).json({
                noadmin: 'No adminCat found'
            })


        }
    })
}


exports.UndoSoftdel = (req, res) => {
    Admin.findOne({
        where: {
            id: req.params.id,
        },
        paranoid: false
    }).then(admin => {
        if (admin !== null) {
            admin.restore();
            res.json({
                success: true
            })
        } else {
            res.status(404).json({
                noadminfound: 'admin not found'
            })
        }
    })
}

exports.RetrieveAdminById = (req, res) => {
    Admin.findOne({
        where: {
            id: req.params.id
        },
    })
        .then(admin => {
            if (admin) { res.json(admin) }
            else {
                res.status(404).json({ noadminfound: 'No admin found with that ID' })
            }
        }
        )
        .catch(err =>
            res.status(404).json({
                noadminfound: 'No admin found'
            })
        );
};