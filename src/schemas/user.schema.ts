import Joi from 'joi';

const name = Joi.string().min(3).max(250);
const email = Joi.string().email();
const password = Joi.string().min(6);
const id = Joi.string().uuid().required();

const postPutUserSchema = Joi.object({
    email: email.required(),
    name: name.required(),
    password: password.required(),
});

const patchUserSchema = Joi.object({
  email,
  name,
  password,
});

const paramUserSchema = Joi.object({
  id
});



export {
    postPutUserSchema,
    paramUserSchema,
    patchUserSchema,
}