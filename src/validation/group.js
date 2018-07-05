const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateGroupInput(data) {
  let errors = {};
  data.org_id = !isEmpty(data.org_id) ? data.org_id : "";
  data.name = !isEmpty(data.name) ? data.name : "";
  data.description = !isEmpty(data.description) ? data.description : "";
  if (validator.isEmpty(data.org_id)) {
    errors.org_id = "org_id Field is required";
  }
  if (validator.isEmpty(data.name)) {
    errors.name = "name Field is required";
  }
  if (!validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "name must be in 2 to 30 char";
  }
  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
