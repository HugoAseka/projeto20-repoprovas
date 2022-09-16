import Joi from "joi";

interface userRequest {
  email: string;
  password: string;
}

export const userSchema = Joi.object<userRequest>({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});
