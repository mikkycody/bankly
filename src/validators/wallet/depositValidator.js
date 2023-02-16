import Joi from "joi";

const validateDeposit = async (payload) => {
  const schema = Joi.object({
    amount: Joi.number().integer().required().min(1000).max(10000).messages({
      "any.required": "Amount is required.",
      "number.base": "Amount must be a number.",
      "number.integer": "Amount must be an integer.",
      "number.min": "Amount must be more than or equal to NGN1,000.",
      "number.max": "Amount must be less than or equal to NGN10,000.",
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
export default validateDeposit;
