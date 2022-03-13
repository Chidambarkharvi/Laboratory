
const mongoose = require("mongoose");


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

const testSchema = new mongoose.Schema({
    userid: { type: String },
  heamatology: heamatology,
  glucometry: glucometry,
  thyroid: thyroid,
});

const Test = mongoose.model("Test", testSchema);
module.exports = Test;
