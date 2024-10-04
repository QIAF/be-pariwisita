const bcrypt = require("bcrypt");
const { randomUUID } = require('crypto');
const jwt = require('jsonwebtoken');
const ApiError = require("../utils/apiError");
const { User } = require("../models");

const register = async (req, res, next) => {
  try {
    const { name, role, password, confirm_password } = req.body;
    if (password !== confirm_password) {
      return next(new ApiError("Passwords do not match", 400));
    }
    
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    const hashedConfirmPassword = bcrypt.hashSync(confirm_password, saltRounds);
      const newUser = await User.create(
        {
          name,
          role,
          password:hashedPassword,
          confirm_password:hashedConfirmPassword
        },
      );
      console.log(newUser)
      res.status(201).json({
        status: true,
        message: "User created successfully",
        data: {
          id: newUser.id,
          name: newUser.name,
          role: newUser.role,
        },
      });
  } catch (err) {
    return next(new ApiError(err.message, 500));
  }
};
const login = async (req, res, next) => {
  try {
    const { name, password } = req.body;
    console.log(req.body)

    if (!name || !password) {
      return next(new ApiError("Please enter name and password", 400));
    }

    const findUser = await User.findOne({
      where: {
        name,
      },
    });
   console.log(findUser)

    if (!findUser) {
      return next(new ApiError("User not found", 400));
    }

    // Bandingkan password yang dimasukkan dengan password yang di-hash
    const isPasswordValid = bcrypt.compareSync(password, findUser.password);
    console.log('Input Password:', password);
    console.log('Hashed Password from DB:', findUser.password);
    console.log('Is Password Valid:', isPasswordValid);
    
    if (!isPasswordValid) {
      return next(new ApiError("Invalid name or password", 401));
    }

    // Jika password valid, buat token JWT
    const token = jwt.sign(
      {
        id: findUser.id,
        name: findUser.name,
        role: findUser.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRED,
      }
    );

    // Set cookie dengan token
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // Set cookie untuk 1 hari
    });

    res.status(200).json({
      status: "true",
      message: "Login successfully",
      token: token,
    });
  } catch (err) {
    return next(new ApiError(err.message, 500));
  }
};

// const login = async (req, res, next) => {
//   try {
//     const { name, password } = req.body;
//     // console.log(req.body)
   
//     if (!name || !password) {
//       return next(new ApiError("Please enter name or password", 400));
//     }
//     const findUser = await User.findOne({
//       where: {
//         name,
//       },
   
//     });

//     // console.log(findUser)
//     if (!findUser) {
//       return next(new ApiError("User not found", 400));
//     }
//     const isPasswordValid = bcrypt.compareSync(password, findUser.password);
//     console.log(isPasswordValid);
//     if (!isPasswordValid) {
//       return next(new ApiError("Invalid name or password", 401));
//     }
//     const token = jwt.sign(
//       {
//         id: findUser.id,
//         name: findUser.name,
//         role: findUser.role,
//       },
//       process.env.JWT_SECRET,
//       {
//         expiresIn: process.env.JWT_EXPIRED,
//       }
//     );
//        console.log(token);

//     res.cookie("token", token, {
//       httpOnly: true,
//       maxAge: 24 * 60 * 60 * 100,
//     });
//     res.status(200).json({
//       status: "true",
//       message: "Login successfully",
//       token: token,
//     });
//   } catch (err) {
//     return next(new ApiError(err.message, 500));
//   }
// };
module.exports = {
    register,
    login
}