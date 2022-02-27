const jwt = require("jsonwebtoken");

const User = require("../model/dataSchema");

const Authenticate = async (req, res, next) => {
  try {
    console.log("try");
    const token = req.cookies.jwtoken;
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY, {
      complete: true,
    });

    const rootUser = await User.findOne({
      _id: verifyToken.payload._id /* ,"tokens.token":token */,
    });
    const allUser = await User.find({ role: "User" });
  

    const userData = [rootUser];
    const allUserData = [...allUser];

    if (rootUser.role === "Admin") {
      //   req.rootUser = [...allUserData];
      res.json(allUserData);
    } else if (rootUser.role === "User") {
      res.json(userData);
    }

    if (!rootUser) {
      throw new Error("user not found");
    }

    // req.token = token
    // req.rootUser = UserArray
    // req.user = rootUser._id;
    next();
  } catch (err) {
    console.log("catch");
    res.status(401).json("user is not authenticated");
    console.log(err);
  }
};

module.exports = Authenticate;
