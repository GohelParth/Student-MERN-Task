import { StudentModel } from "../models/student.model";

const CreateStudents = async (req, res) => {
  try {
    const filenames = req.files.map((file) => file.filename);
    const {
      FirstName,
      LastName,
      FatherName,
      Mobile,
      Email,
      Address,
      Gender,
      Dob,
      Country,
    } = req.body;

    const UserID = req.userId;

    // Adding student data
    const AddStudent = new StudentModel({
      UserID,
      FirstName,
      LastName,
      FatherName,
      Mobile,
      Email,
      Address,
      Images: filenames,
      Gender,
      Dob,
      Country,
    });

    // Check is student exist or not
    const FindStudent = await StudentModel.findOne({
      UserID: UserID,
      Email: Email,
    });

    if (FindStudent) {
      throw new Error("This Student Is Already Exist !");
    } else {
      // Save user in database
      const SaveStudent = await AddStudent.save();

      res.status(200).send({
        message: "Student Added Successfully !",
        status: 200,
        data: SaveStudent,
      });
    }
  } catch (error) {
    res.status(400).send({
      message: error.message,
      status: 400,
      data: {},
    });
  }
};

const GetAllStudents = async (req, res) => {
  try {
    const UserID = req.userId;

    // Check is student exist or not
    const GetAllStudents = await StudentModel.find({
      UserID: UserID,
    });

    if (!GetAllStudents) {
      throw new Error("Students Not Found !");
    } else {
      res.status(200).send({
        message: GetAllStudents?.length
          ? "Student Listed Successfully !"
          : "No Students Added Yet !",
        status: 200,
        data: GetAllStudents,
      });
    }
  } catch (error) {
    res.status(400).send({
      message: error.message,
      status: 400,
      data: {},
    });
  }
};

const UpdateStudents = async (req, res) => {
  try {
    const UserID = req.userId;
    const { id } = req.params;
    const { FirstName, LastName, FatherName, Mobile, Email, Address, Gender } =
      req.body;

    const filter = { _id: id, UserID };
    const update = {
      FirstName,
      LastName,
      FatherName,
      Mobile,
      Email,
      Address,
      Gender,
    };

    const UpdateStudentDate = await StudentModel.findOneAndUpdate(
      filter,
      update,
      {
        new: true,
      }
    );
    if (!UpdateStudentDate) {
      throw new Error("Unable To Update Student Data !");
    } else {
      res.status(200).send({
        message: "Student Data Updated Successfully !",
        status: 200,
        data: GetAllStudents,
      });
    }
  } catch (error) {
    res.status(400).send({
      message: error.message,
      status: 400,
      data: {},
    });
  }
};

const DeleteStudentData = async (req, res) => {
  try {
    const UserID = req.userId;
    const { id } = req.params;

    const filter = { _id: id, UserID };

    const deleteStudent = await StudentModel.findOneAndDelete(filter);

    if (!deleteStudent) {
      throw new Error("Unable To Delete Student Data !");
    } else {
      res.status(200).send({
        status: 200,
        Message: "Student Data Deleted Successfully !",
        data: {},
      });
    }
  } catch (error) {
    res.status(400).send({
      message: error.message,
      status: 400,
      data: {},
    });
  }
};

export { CreateStudents, GetAllStudents, UpdateStudents, DeleteStudentData };
