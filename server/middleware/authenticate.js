const jwt = require("jsonwebtoken");

const User = require("../model/dataSchema");

const Authenticate = async (req, res, next) => {
  console.log("terrrr");
  try {
    console.log("try");
    const token = req.cookies.jwtoken;
    const verifyToken = jwt.verify(token.token, process.env.SECRET_KEY, {
      complete: true,
    });

    const rootUser = await User.findOne({
      _id: verifyToken.payload._id /* ,"tokens.token":token */,
    });
    const allUser = await User.find({ role: "User" });
    console.log(allUser, "fwfrferf");

    const userData = [rootUser];
    const allUserData = [...allUser];

    if (rootUser.role === "Admin") {
      res.json(allUserData);
    } else if (rootUser.role === "User") {
      res.json(userData);
    }

    if (!rootUser) {
      throw new Error("user not found");
    }

    next();
  } catch (err) {
    console.log("catch");
    res.status(401).json("user is not authenticated");
    console.log(err, "jwt error error =>");
  }
};

module.exports = Authenticate;
