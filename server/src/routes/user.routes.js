import express from "express";
const userRoute = express.Router();
import { CreateUser, Login } from "../controllers/user.controller";
import Links from "../utils/links";

const { USER } = Links;
const { REGISTER, LOGIN } = USER;

userRoute.post(REGISTER, CreateUser);
userRoute.post(LOGIN, Login);

export { userRoute };
