// Validation Schemas. For more info on setup refer to ---> 
// https://www.npmjs.com/package/ajv
// https://www.npmjs.com/package/ajv-formats
// https://www.npmjs.com/package/ajv-keywords (sito dar nebandziau, bet cia vat man issprendzia problema del regex. Projekto pabaigoje pabandyti)
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

// AJV setup
const ajv = new Ajv({ allErrors: true, $data: true });
addFormats(ajv);

const registrationSchema = {
    type: 'object',
    properties: {
        email: { type: 'string', format: 'email' },
        username: { type: 'string', minLength: 6 },
        password: { type: 'string', minLength: 6 },
        passwordRepeat: { const: { $data: '1/password' } }
    },
    required: ['email', 'username', 'password', 'passwordRepeat']
};

export default registrationSchema