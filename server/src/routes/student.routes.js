import express from "express";
const studentRoutes = express.Router();
import {
  CreateStudents,
  DeleteStudentData,
  GetAllStudents,
  UpdateStudents,
} from "../controllers/student.controller";
import { userAuthentication } from "../middleware/auth";
import Links from "../utils/links";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

const { STUDENT } = Links;
const { ADD, GET, UPDATE, DELETE } = STUDENT;

studentRoutes.get(GET, userAuthentication, GetAllStudents);
studentRoutes.post(
  ADD,
  userAuthentication,
  upload.array("image"),
  CreateStudents
);
studentRoutes.put(UPDATE, userAuthentication, UpdateStudents);
studentRoutes.delete(DELETE, userAuthentication, DeleteStudentData);

export { studentRoutes };
