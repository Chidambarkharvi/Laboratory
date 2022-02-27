const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const heamatology = mongoose.Schema({
  haemoglobin: { type: String },
  neutrophils: { type: String },
  eosinophiles: { type: String },
  basophills: { type: String },
  pcv: { type: String },
  wbc: { type: String },
  lymphocytes: { type: String },
  monocytes: { type: String },
  rbc: { type: String },
  mcv: { type: String },
});

const glucometry = new mongoose.Schema({
  fbs: { type: String },
  ppbs: { type: String },
  gh: { type: String },
  calcium: { type: String },
});
const thyroid = new mongoose.Schema({
  tri: { type: String },
  thyroxine: { type: String },
  tsh: { type: String },
});

const userSchema = new mongoose.Schema({
  name: { type: String },

  email: { type: String },
  password: { type: String },
  date: { type: String },
  role: { type: String },
  heamatology: heamatology,
  glucometry: glucometry,
  thyroid: thyroid,
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

//token generation

userSchema.methods.generateAuthToken = async function () {
  console.log("dhjshfdsjk>");
  try {
    let token = jwt.sign(
      {
        _id: this._id,
      },
      process.env.SECRET_KEY
    );
    this.tokens = this.tokens.concat({
      token: token,
    });
    await this.save();
    console.log(token);
    return token;
  } catch (err) {
    console.log(err);
  }
};

const User = mongoose.model("USER", userSchema);

module.exports = User;
