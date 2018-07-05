const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateOrgInput(data) {
  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.org_nr = !isEmpty(data.org_nr) ? data.org_nr : "";

  if (validator.isEmpty(data.name)) {
    errors.name = "name Field is required";
  }
  if (!validator.isLength(data.name, { min: 2, max: 50 })) {
    errors.name = "name must be in 2 to 30 char";
  }
  if (validator.isEmpty(data.email)) {
    errors.email = "email Field is required";
  }
  if (!validator.isEmail(data.email)) {
    errors.email = "email is invalid";
  }
  if (validator.isEmpty(data.org_nr)) {
    errors.org_nr = "organization number is required";
  }
  if (!validator.isLength(data.org_nr, { min: 6, max: 30 })) {
    errors.org_nr = "organization number must be between 6 amd 30 char";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
