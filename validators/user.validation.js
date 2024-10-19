import Validator from 'validator';
import isEmpty from './isEmpty.js';
import { isSpecial, isUpper, NumericalExists } from './password.validation.js';

export const validateUserInput = (data) => {

    let errors = {};
    data.name = !isEmpty(data.name) && data.name !== undefined ? data.name : '';
    data.phone_number = !isEmpty(data.phone_number) && data.phone_number !== undefined ? data.phone_number : '';
    data.role = !isEmpty(data.role) && data.role !== undefined ? data.role : '';
    data.dob = !isEmpty(data.dob) && data.dob !== undefined ? data.dob : '';
    data.gender = !isEmpty(data.gender) && data.gender !== undefined ? data.gender : '';
    data.ID_no = !isEmpty(data.ID_no) && data.ID_no !== undefined ? data.ID_no : '';
    data.password = !isEmpty(data.password) && data.password !== undefined ? data.password : '';
    data.confirm_password = !isEmpty(data.confirm_password) && data.confirm_password !== undefined ? data.confirm_password : '';

    if (Validator.isEmpty(data.name)) {
        errors.name = 'Kindly enter a Name';
    }
    if (Validator.isEmpty(data.phone_number)) {
        errors.phone_number = 'Enter phone Number';
    }
    if (Validator.isEmpty(data.role)) {
        errors.role = 'Enter user role';
    }
    if (Validator.isEmpty(data.dob)) {
        errors.dob = 'Enter date of birth';
    }
    if (Validator.isEmpty(data.ID_no)) {
        errors.ID_no = 'Enter date of birth';
    }
    // if (Validator.isEmpty(data.dob)) {
    //     errors.dob = 'Enter date of birth';
    // }
    if (Validator.isEmpty(data.gender)) {
        errors.gender = 'Select gender ';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password is required';
    }
    if (!isUpper(data.password)) {
        errors.password = 'Password Must contain Both Upper and Lower case Characters  ';
    }
    if (!isSpecial(data.password)) {
        errors.password = 'Password Must contain at least one special characters  ';
    }

    if (!Validator.isLength(data.password, { min: 8, max: 30 })) {
        errors.password = 'Password must be more than 8 characters long';
    }
    if (!NumericalExists(data.password)) {
        errors.password = 'Password Must have at least one Numerical value';
    }

    if (!Validator.isLength(data.phone_number, { min: 10, max: 14 })) {
        errors.phone_number = 'phone Number  must have at least  10 characters ';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}
export const validateGuardianInput = (data) => {

    let errors = {};
    data.name = !isEmpty(data.name) && data.name !== undefined ? data.name : '';
    data.phone_number = !isEmpty(data.phone_number) && data.phone_number !== undefined ? data.phone_number : '';
    data.role = !isEmpty(data.role) && data.role !== undefined ? data.role : '';
    data.dob = !isEmpty(data.dob) && data.dob !== undefined ? data.dob : '';
    data.gender = !isEmpty(data.gender) && data.gender !== undefined ? data.gender : '';
    data.ID_no = !isEmpty(data.ID_no) && data.ID_no !== undefined ? data.ID_no : '';
    data.password = !isEmpty(data.password) && data.password !== undefined ? data.password : '';
    data.confirm_password = !isEmpty(data.confirm_password) && data.confirm_password !== undefined ? data.confirm_password : '';

    if (Validator.isEmpty(data.name)) {
        errors.name = 'Kindly enter Guardian  Name';
    }
    if (Validator.isEmpty(data.phone_number)) {
        errors.phone_number = 'Enter phone Number';
    }

    if (Validator.isEmpty(data.ID_no)) {
        errors.ID_no = 'Enter date Identification No';
    }
    if (!Validator.isLength(data.phone_number, { min: 10, max: 14 })) {
        errors.phone_number = 'phone Number  must have at least  10 characters ';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}
export const validateUserLoginInput = (data) => {

    let errors = {};
    data.phone_number = !isEmpty(data.phone_number) && data.phone_number !== undefined ? data.phone_number : '';
    data.password = !isEmpty(data.password) && data.password !== undefined ? data.password : '';


    if (Validator.isEmpty(data.phone_number)) {
        errors.phone_number = 'Enter phone Number';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

