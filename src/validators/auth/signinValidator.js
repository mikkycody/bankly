import Joi from "joi";

const validateSignin = async (payload) => {
  const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).trim().messages({
      "string.email": "Email address is invalid",
      "any.required": "Email is required",
    }),
    password: Joi.string().required().trim().messages({
      "any.required": "Password is required",
    }),
  });
  try {
    const value = await schema.validateAsync(payload, {
      stripUnknown: true,
      allowUnknown: false,
      abortEarly: true,
    });
    return { value };
  } catch (error) {
    return { error };
  }
};
export default validateSignin;
