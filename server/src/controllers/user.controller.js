import { GenerateToken } from "../middleware/auth";
import { UserModel } from "../models/user.model";
import { hash, compare } from "../utils/password";

const CreateUser = async (req, res) => {
  try {
    const { UserName, Email, Password } = req.body;

    //   Encrypt password method
    const hashPassword = await hash(Password);

    // Creating user
    const CreateUser = new UserModel({
      UserName: UserName,
      Email: Email,
      Password: hashPassword,
    });

    // Check is user exist or not
    const FindUser = await UserModel.findOne({ Email: Email });

    if (FindUser) {
      throw new Error("This User Is Already Exist !");
    } else {
      // Save user in database
      const SaveUser = await CreateUser.save();

      res.status(200).send({
        message: "User Created Successfully !",
        status: 200,
        data: SaveUser,
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

const Login = async (req, res) => {
  try {
    const { Email, Password } = req.body;

    const user = await UserModel.findOne({ Email: Email });

    if (!user || user.Password == null) {
      throw new Error("UserName Or Password Is Invalid !");
    } else {
      const MatchPassword = compare(Password, user.Password);

      if (!MatchPassword) {
        throw new Error("Password is incorrect !");
      } else {
        res.status(200).send({
          message: "Login Successfull !",
          status: 200,
          data: await GenerateToken(user),
        });
      }
    }
  } catch (error) {
    res.status(400).send({
      message: error.message,
      status: 400,
      data: {},
    });
  }
};

export { CreateUser, Login };
