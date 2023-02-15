import HttpStatus from "http-status";
import response from "../../utils/response/ResponseHandler";
import validateSignup from "../../validators/auth/signupValidator";
import validateSignin from "../../validators/auth/signinValidator";
import authService from "../../services/auth/authService";

const signup = async (req, res, next) => {
  try {
    const { error, value: payload } = await validateSignup(req.body);
    if (error) {
      return response(res, error.message, HttpStatus.BAD_REQUEST);
    }
    const user = await authService.signUp(payload);
    return response(res, "User Registered", HttpStatus.CREATED, user);
  } catch (error) {
    next(error);
  }
};

const signin = async (req, res, next) => {
  try {
    const { error, value: payload } = await validateSignin(req.body);
    if (error) {
      return response(res, error.message, HttpStatus.BAD_REQUEST);
    }
    const user = await authService.signIn(payload);
    return response(res, "User Authenticated", HttpStatus.OK, user);
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const token = req?.headers?.authorization?.split(' ')[1];
    const user = await authService.refreshAccessToken(token);
    return response(res, "Token Refreshed", HttpStatus.OK, user);
  } catch (error) {
    next(error);
  }
};

export { signup, signin, refreshToken };
