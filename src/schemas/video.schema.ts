import Joi from 'joi';

const videoId = Joi.string().uuid().required();
const filename = Joi.string().required();
const title = Joi.string().min(1);
const description = Joi.string();
const credits = Joi.string();
const userId = Joi.string();
const isPublic = Joi.boolean();

const postVideoSchema = Joi.object({
  title: title.required(),
  userId: userId.required(),
  filename,
  description,
  credits,
  isPublic
});


const putVideoSchema = Joi.object({
  title: title.required(),
  description: description.required(),
  credits: credits.required(),
  isPublic: isPublic.required(),
});

const patchVideoSchema = Joi.object({
 title,
 description,
 credits,
 isPublic
});


const paramsVideoSchema = Joi.object({
  videoId
});



export {
  postVideoSchema,
  putVideoSchema,
  paramsVideoSchema,
  patchVideoSchema,
}