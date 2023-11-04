import validator from "validator";

function FormValidation(form, usernameRequired = true, emailValidation = true) {
  const { username, email, password } = form;
  if (usernameRequired) {
    if (validator.isEmpty(username)) throw "Please enter your username";
  } else if (validator.isEmpty(email)) throw "Please enter your email";
  if (emailValidation) {
    if (!validator.isEmail(email)) throw "Please enter a valid email";
  }
  if (validator.isEmpty(password)) throw "Please enter your password";
  else if (password.length < 8)
    throw "The password must be at least 8 charachters";
  else {
    return true;
  }
}
export { FormValidation };
