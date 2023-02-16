import Joi from "joi";
import User from "../../models/user";

const checkIfExists = async (value) => {
  const user = await User.findOne({ email: value });
  if (!user) {
    throw new Error(`Beneficiary not found.`);
  }
};

const validateTransfer = async (payload) => {
  const schema = Joi.object({
    amount: Joi.number().integer().required().min(100).max(10000).messages({
      "any.required": "Amount is required.",
      "number.base": "Amount must be a number.",
      "number.integer": "Amount must be an integer.",
      "number.min": "Amount must be more than or equal to NGN100.",
      "number.max": "Amount must be less than or equal to NGN10,000.",
    }),

    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .trim()
      .external(checkIfExists)
      .messages({
        "string.email": "Beneficiary email address is invalid",
        "any.required": "Beneficiary email is required",
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
export default validateTransfer;
