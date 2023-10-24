const mongoose = require("mongoose");

let social_handle = {
  facebook: "",
  instagram: "",
  tiktok: "",
  x: "",
};

let FinanceInstituteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  social_media: {
    type: Object,
    required: false,
    default: social_handle,
  },
  is_verified: {
    type: Boolean,
    default: false,
  },
});

let FinanceInstitute = mongoose.model("financeinstitutions", FinanceInstituteSchema)
module.exports = FinanceInstitute