import joi from "joi";

export type typeTestSchema = {
  name: string;
  pdfUrl: string;
  category: string;
  discipline: string;
  teacher: string;
}

export const testSchema = joi.object<typeTestSchema>({
  name: joi.string().required(),
  pdfUrl: joi
    .string()
    .pattern(
      /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
    )
    .required(),
  category: joi.string().required(),
  discipline: joi.string().required(),
  teacher: joi.string().required(),
});
