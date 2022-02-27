const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const cookieParser = require("cookie-parser");
const authenticate = require("../middleware/authenticate");

require("../db/conn");

const User = require("../model/dataSchema");

router.use(cookieParser());

router.get("/", (req, res) => {
  res.send("home");
});

router.get("/contact", (req, res) => {
  res.send("contact  dvme");
});

router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  if ((!name, !email, !password, !role)) {
    return res.status(422).json({
      errors: "Fill the all details",
    });
  }

  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "User already exists" });
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
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "fill the data",
      });
    }

    const userLogin = await User.findOne({ email: email });
    console.log(userLogin,"users detai")

    token = await userLogin.generateAuthToken();
    console.log(token,"generated toke");

    //storing cookie
    res.cookie("jwtoken", token, {
      expires: new Date(Date.now() + 8640000),
      httpOnly: true,
    });

    if (!userLogin || userLogin.password !== password) {
      res.status(400).json({ message: "user error" });
    } else {
      res
        .status(200)
        .json({
          message: "user signed in successfully",
          role: userLogin.role,
          token: userLogin.token,
        });
    }
  } catch (err) {
    console.log(err);
  }
});

//user details
router.get("/details", authenticate, (req, res) => {
  res.send(req.rootUser);
});


router.post("/userdetails" , (req, res) => {
  let
})

router.get("/sample", authenticate, (req, res) => {
  res.send(req.rootUser);
});

router.post("/sample", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

//logout
router.get("/logout", (req, res) => {
  console.log("hello logout");
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).send("user logout");
});

router.post("/admin", async (req, res) => {
  try {
    // const { heamatology, glucometry, Thyroid } = req.body;
    const heamatology = req.body.heamatology
    const glucometry = req.body.glucometry

    

    console.log(req.body,"req vody");
    const user = new User({
      heamatology: {
        haemoglobin: heamatology[0].haemoglobin,
        neutrophils: heamatology[0].neutrophils,
        eosinophiles: heamatology[0].eosinophiles,
        basophills: heamatology[0].basophills,
        pcv: heamatology[0].pcv,
        wbc: heamatology[0].wbc,
        lymphocytes: heamatology[0].wbc,
        monocytes: heamatology[0].lymphocytes,
        rbc: heamatology[0].rbc,
      },

      glucometry: {
        FBS: glucometry[0].FBS,
        PPBS: glucometry[0].PPBS,
        GH: glucometry[0].GH,
        Calcium: glucometry[0].Calcium,
      },

      Thyroid: {
        TRI: Thyroid[0].TRI,
        Thyroxine: Thyroid[0].Thyroxine,
        TSH: Thyroid[0].TSH,
      },
    });

    const userRegister = await user.save();
    res.json({ message: req.body });
  } catch (err) {
    console.log(err);
  }
});

// router.get("/admin") , (req, res) => {

// }

module.exports = router;
