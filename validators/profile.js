// Not that because validator js doesn't work it undefined
// we first have to convert undefined values to empty string
// we use the isEmpty_ to check if its undefined
// and if so. we conver it to an empty string here

import Validator from "validator";
import isEmpty_ from "./isEmpty";

const validateProfileInput = data => {
  let errors = {};

  data.handle = !isEmpty_(data.handle) ? data.handle : "";
  data.status = !isEmpty_(data.status) ? data.status : "";
  data.skills = !isEmpty_(data.skills) ? data.skills : [];

  console.log("****** data.skills ", data.skills);
  // Required fields

  if (!Validator.isLength(data.handle, { min: 2, max: 30 }))
    errors.handle =
      "Handle must be between 2 and 30 characters including spaces";

  if (Validator.isEmpty(data.handle)) errors.handle = "Handle is required";

  if (Validator.isEmpty(data.status))
    errors.status = "Status field is required";

  if (data.skills.length === 0) errors.skills = "Skills field is required";

  // Optional fields

  if (!isEmpty_(data.website)) {
    if (
      !Validator.matches(data.website.substr(0, 7), "http://") &&
      !Validator.matches(data.website.substr(0, 8), "https://")
    ) {
      errors.website = "Website URl must begin with http:// or https://";
    }
  }

  if (!isEmpty_(data.website)) {
    if (!Validator.isURL(data.website)) errors.website = "Not a valid URL";
  }

  if (!isEmpty_(data.linkedin)) {
    if (
      !Validator.matches(data.linkedin.substr(0, 7), "http://") &&
      !Validator.matches(data.linkedin.substr(0, 8), "https://")
    ) {
      errors.linkedin = "Website URl must begin with http:// or https://";
    }
  }

  if (!isEmpty_(data.linkedin)) {
    if (!Validator.isURL(data.linkedin)) errors.linkedin = "Not a valid URL";
  }

  if (!isEmpty_(data.twitter)) {
    if (
      !Validator.matches(data.twitter.substr(0, 7), "http://") &&
      !Validator.matches(data.twitter.substr(0, 8), "https://")
    ) {
      errors.twitter = "Website URl must begin with http:// or https://";
    }
  }

  if (!isEmpty_(data.twitter)) {
    if (!Validator.isURL(data.twitter)) errors.twitter = "Not a valid URL";
  }

  if (!isEmpty_(data.instagram)) {
    if (
      !Validator.matches(data.instagram.substr(0, 7), "http://") &&
      !Validator.matches(data.instagram.substr(0, 8), "https://")
    ) {
      errors.instagram = "Website URl must begin with http:// or https://";
    }
  }
  if (!isEmpty_(data.instagram)) {
    if (!Validator.isURL(data.instagram)) errors.instagram = "Not a valid URL";
  }

  if (!isEmpty_(data.facebook)) {
    if (
      !Validator.matches(data.facebook.substr(0, 7), "http://") &&
      !Validator.matches(data.facebook.substr(0, 8), "https://")
    ) {
      errors.facebook = "Website URl must begin with http:// or https://";
    }
  }

  if (!isEmpty_(data.facebook)) {
    if (!Validator.isURL(data.facebook)) errors.facebook = "Not a valid URL";
  }

  return {
    errors,
    isValid: isEmpty_(errors)
  };
};

export default validateProfileInput;
