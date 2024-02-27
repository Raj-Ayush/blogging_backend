const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');
const fs = require('fs');


dotenv.config({
    path: path.join(__dirname, '../../.env'),
});

const envVarsSchema = Joi.object()
.keys({
    NODE_ENV: Joi.string().valid('production', 'development').required(),
    DB_PATH: Joi.string().default(':memory:'),
    PORT: Joi.number().default(5000),
}).unknown()


const { value: envVars, error } = envVarsSchema
  .prefs({
    errors: {
      label: 'key',
    },
  })
  .validate(process.env);

const config = {
    env: envVars.NODE_ENV,
    dbPath: envVars.DB_PATH,
    port: envVars.PORT
};

global.config = config;
module.exports = config;