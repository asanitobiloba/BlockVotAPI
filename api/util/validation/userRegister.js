const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validatorRegisterInpute(data) {
    let errors = {};
    data.fullName = !isEmpty(data.fullName) ? data.fullName : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';

    if (!Validator.isLength(data.fullName, { min: 2, max: 30 })) {
        errors.name = 'Name must be betwwen 3 and 30 characters';
    }

    if (Validator.isEmpty(data.fullName)) {
        errors.name = 'Name  field is required';
    }
    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }
    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }
    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = 'Passwords must be at least 6 characters';
    }
    if (Validator.isEmpty(data.password2)) {
        errors.password2 = 'Confirm Password field is required';
    }
    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = 'Passwords must match  ';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};