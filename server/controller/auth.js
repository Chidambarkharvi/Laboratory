const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("../db/conn");
const User = require("../model/dataSchema");

router.use(cookieParser());

//register routes
const register = async (req, res, next) => {
  const { name, email, password, role } = req.body;
  if ((!name, !email, !password, !role)) {
    return res.status(422).json({
      errors: "Fill the all details",
    });
  }
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(409).json({ error: "User already exists" });
    } else {
      const user = new User({
        name,
        email,
        password,
        role,
      });
      const userRegister = await user.save();
      if (userRegister) {
        return res
          .status(201)
          .json({ message: "User registered successfully" });
      }
    }
  } catch (err) {
    next(err);
  }
};

//login route
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "fill the data",
      });
    }
    const userLogin = await User.findOne({ email: email });
    console.log(userLogin);
    if (!userLogin) {
      return res.status(401).json({ error: "User not registered" });
    }
    let token = jwt.sign(
      {
        _id: userLogin._id,
      },
      process.env.SECRET_KEY
    );

    if (!userLogin || userLogin.password !== password) {
      res.status(400).json({ message: "user error" });
    } else {
      res.status(200).json({
        message: "user signed in successfully",
        role: userLogin.role,
        id: userLogin._id,
      });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

//user detail fetching
const details = async (req, res) => {
  const id = req.body;
  try {
    const rootUser = await User.findOne({
      _id: id,
    });
    const allUser = await User.find({ role: "User" });
    const userData = [rootUser];
    const allUserData = [...allUser];
    if (rootUser.role === "admin") {
      res.json(allUserData);
    } else if (rootUser.role === "User") {
      res.json(userData);
    }
    if (!rootUser) {
      throw new Error("user not found");
    }
  } catch (err) {
    res.status(401).json({ message: "user is not authenticated" });
    console.log(err, "jwt error error =>");
  }
};

//delete user
const removeUser = async (req, res) => {
  const { id } = req.body;
  // console.log(_id);
  console.log("----------remove user", req.body);
  // res.send("user remover");

  if (id) {
    await User.deleteOne({ _id: id });
    res.json({
      error: false,
      message: "User deleted successfully",
    });
  }
};

//update user
const update = async (req, res) => {
  const { heamatology, glucometry, thyroid, _id } = req.body;
  try {
    updatedUser = await User.updateOne(
      { _id: _id },
      {
        $set: {
          heamatology: {
            haemoglobin: heamatology?.haemoglobin,
            neutrophils: heamatology?.neutrophils,
            eosinophiles: heamatology?.eosinophiles,
            basophills: heamatology?.basophills,
            pcv: heamatology?.pcv,
            wbc: heamatology?.wbc,
            lymphocytes: heamatology?.wbc,
            monocytes: heamatology?.lymphocytes,
            rbc: heamatology?.rbc,
            mcv: heamatology?.mcv,
          },
        },
      }
    );
    if (updatedUser) {
      return res.status(200).json({
        message: "updated successfully ",
        data: heamatology,
      });
    }
  } catch (e) {
    console.log(e, "update error");
  }
};

// logout
const logout = (req, res) => {
  res.status(200).send("user logout");
};

const entersample = async (req, res) => {
  const { heamatology, glucometry, thyroid, id, editId } = req.body;
  try {
    let updatedUser;
    if (editId === 1) {
      updatedUser = await User.updateOne(
        { _id: id },
        {
          $set: {
            heamatology: {
              haemoglobin: heamatology?.haemoglobin,
              neutrophils: heamatology?.neutrophils,
              eosinophiles: heamatology?.eosinophiles,
              basophills: heamatology?.basophills,
              pcv: heamatology?.pcv,
              wbc: heamatology?.wbc,
              lymphocytes: heamatology?.wbc,
              monocytes: heamatology?.lymphocytes,
              rbc: heamatology?.rbc,
              mcv: heamatology?.mcv,
            },
          },
        }
      );
    } else if (editId === 2) {
      updatedUser = await User.updateOne(
        { _id: id },
        {
          $set: {
            glucometry: {
              fbs: glucometry?.fbs,
              ppbs: glucometry?.ppbs,
              gh: glucometry?.gh,
              calcium: glucometry?.calcium,
            },
          },
        }
      );
    } else if (editId === 3) {
      updatedUser = await User.updateOne(
        { _id: id },
        {
          $set: {
            thyroid: {
              tri: thyroid?.tri,
              thyroxine: thyroid?.thyroxine,
              tsh: thyroid?.tsh,
            },
          },
        }
      );
    }
    if (updatedUser) {
      return res.status(200).json({
        message: "updated successfully ",
        output: updatedUser,
      });
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ details: err.message, message: "Something went wrong" });
  }
};


//otp verifaction

const otpVerify = async (req,res) =>{
  try{
    const otp = `${1000 + Math.random() * 9000}`

  }
  catch(err){

  }

}

module.exports = {
  register,
  login,
  details,
  logout,
  entersample,
  update,
  removeUser,
};
