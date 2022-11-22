const { body, validationResult } = require('express-validator');

const register = () => {
    return console.log(body('email'));
}

let validateUser = {register}

module.exports = {validateUser};