import Joi from "joi";

export type NewUserRequest =  {
  email: string;
  password: string;
  passwordConfirmation: string;
}

export const authSchema = Joi.object<NewUserRequest>({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  passwordConfirmation: Joi.string().required(),
});


