import User from "../../models/user";
import jwt from "jsonwebtoken";
import config from "../../config/app";
import argon from "argon2";
import AppError from "../../exceptions";
import HttpStatus from "http-status";
import RedisService from "../redis/redisService";

const signUp = async (payload) => {
  const userData = payload;
  const hashedPassword = await hashPassword(userData.password);
  const updatedUserData = { ...userData, password: hashedPassword };
  const user = await User.create(updatedUserData);
  const newUser = user.toJSON();
  delete newUser.password
  return mergeUserWithToken(newUser);
};

const signIn = async (payload) => {
  const user = await User.findOne({ email: payload.email }).select("+password");
  if (!user) {
    throwInvalidCredentialsError();
  }
  const verifyPassword = await validatePassword(
    user.password,
    payload.password
  );
  if (!verifyPassword) {
    throwInvalidCredentialsError();
  }
  const authUser = user.toJSON();
  delete authUser.password;
  return mergeUserWithToken(authUser);
};

const refreshAccessToken = async (token) => {
  if (!token) {
    throw new AppError("Please provide a valid token", HttpStatus.BAD_REQUEST);
  }

  const userId = await RedisService.get(token);

  if (!userId) {
    throw new AppError("Invalid refresh token", HttpStatus.FORBIDDEN);
  }
  const user = await User.findById(userId);
  return mergeUserWithToken(user.toJSON());
};

const throwInvalidCredentialsError = () => {
  throw new AppError("Invalid Credentials", HttpStatus.BAD_REQUEST);
};

const mergeUserWithToken = async (user) => {
  const { accessToken, refreshToken, expiresIn } = await generateTokenPair(
    user
  );
  return { ...user, accessToken, refreshToken, expiresIn };
};

const generateTokenPair = async (user) => {
  const expiresIn = config.jwt.access_token_expiration;
  const accessToken = jwt.sign(
    { id: user._id, email: user.email },
    config.jwt.secret,
    { expiresIn }
  );
  const refreshToken = jwt.sign(
    { id: user._id, email: user.email },
    config.jwt.secret,
    { expiresIn: config.jwt.refresh_token_expiration }
  );
  await RedisService.set(refreshToken, user._id.toString(), {
    EX: config.jwt.refresh_token_expiration,
  });
  return { accessToken, refreshToken, expiresIn };
};

const hashPassword = async (password) => {
  return argon.hash(password);
};

const validatePassword = async (hashedPassword, plainPassword) => {
  return argon.verify(hashedPassword, plainPassword);
};

export default { signUp, signIn, refreshAccessToken };
