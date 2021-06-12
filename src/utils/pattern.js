const { cnpj, validator } = require('cpf-cnpj-validator');
const Joi = require('@hapi/joi').extend(validator);

const cnpjSchema = Joi.document().cnpj();

exports.validateCNPJ = function (data) {
  let formatted
    let isValid = cnpj.isValid(data);
    if(!isValid) {
        throw createError(400, `The CNPJ '${data}' is not valid`);
      };
    formatted = cnpj.format(data);
    return formatted;
}