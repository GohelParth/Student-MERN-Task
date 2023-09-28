import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UserModel } from "../models/user.model";

dotenv.config();

//Generate The JWT Token
const GenerateToken = async (payload) => {
  try {
    var token = jwt.sign({ payload }, process.env.SECRET, {
      expiresIn: "300s", // expires in 5 minutes
    });
    return token;
  } catch (error) {
    res.status(400).send({
      message: error.message,
      status: 400,
      data: {},
    });
  }
};

// Check user is logged in or not
const userAuthentication = async (req, res, next) => {
  try {
    var token = req.headers["access-token"];

    let decoded;
    if (!token)
      return res.status(401).send({
        auth: false,
        message: "No token provided || Login Required !",
      });

    decoded = jwt.verify(token, process.env.SECRET);

    const userData = await UserModel.findOne({
      _id: decoded.payload._id,
    });

    if (!userData) {
      var error = {
        statusCode: 401,
        message: `Only Access For Registered Users !`,
      };
      throw error;
    } else {
      req.userId = decoded.payload._id;
      next();
    }
  } catch (error) {
    if (error.statusCode == 401) {
      const response = {
        statusCode: error.statusCode,
        message: error.message,
        data: null,
      };
      res.status(401).send(response);
    } else {
      const response = {
        statusCode: error.statusCode,
        message: error.message,
        data: null,
      };
      res.status(400).send(response);
    }
  }
};

export { GenerateToken, userAuthentication };
