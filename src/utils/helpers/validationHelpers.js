import {EMAIL_VALIDATOR, PASSWORD_VALIDATOR} from "../constants/validationConstants";

function isNotValidEmailAddress(email) {
    return !EMAIL_VALIDATOR.test(email);
}

function isNotValidPassword(password) {
    password = password.trim();
    if (password.length <= 6) return true;
    return !PASSWORD_VALIDATOR.test(password);
}

export {isNotValidEmailAddress, isNotValidPassword};
