// Registration data validation related imports
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

import registrationSchema from '../../models/registrationSchema.js'

// Ajv setup
const ajv = new Ajv({ allErrors: true, $data: true });
addFormats(ajv);

const registerValidation = async (req, res, next) => {
    try {
        if (req.body) { // will execute if body will not be empty
            const validate = ajv.compile(registrationSchema);
            const data = {
                email: req.body.email,
                username: req.body.username,
                password: req.body.password,
                passwordRepeat: req.body.passwordRepeat
            };
            const valid = validate(data);
            if (!valid) // if some of the information will not match the written schema -> error will be send. For further development -> remain in the same page and indicate, that some of the information is not validated (depending on error)
                return res.status(400).send({ msg: validate.errors });
        };
    } catch (err) {
        return res.status(400).send({ msg: err }) // If there will be time, create error handling separate page
    };
    next();
};

export default registerValidation