import Joi from "joi";
import User from "../../models/user";

const checkExistence = (col) => async (value) => {
  const user = await User.findOne({ [col]: value });
  if (user) {
    throw new Error(`${col} has been taken.`);
  }
};
const validateSignup = async (payload) => {
  const schema = Joi.object({
    firstname: Joi.string()
      .required()
      .trim()
      .messages({ "any.required": "Firstname is required" }),
    lastname: Joi.string()
      .required()
      .trim()
      .messages({ "any.required": "Lastname is required" }),
    email: Joi.string()
      .email()
      .required()
      .trim()
      .external(checkExistence("email"))
      .messages({ "any.required": "Email is required" }),
    password: Joi.string()
      .required()
      .trim()
      .min(8)
      .regex(
        new RegExp(
          "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
        )
      )
      .messages({
        "any.required": "Password is required",
        "string.min": "Password must be at least 8 characters long",
        "string.pattern.base":
          "Password must be a minimum of 8 characters and should contain mixed case, and at least a number and a special character ",
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
export default validateSignup;
