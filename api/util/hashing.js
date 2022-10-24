const bcrypt = require('bcryptjs');


let password = '';
 exports.hashPassword = (pass) => {
    /**
     * Hash Password Method
     * @param {string} password
     * @returns {string} returns hashed password
     */
    password = bcrypt.hashSync(pass, bcrypt.genSaltSync(10));
    return password;
        
};

