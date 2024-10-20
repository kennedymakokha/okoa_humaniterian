import Validator from 'validator';
import isEmpty from './isEmpty.js';

export const validatePracticalInput = (data) => {

    let errors = {};
    data.prac_name = !isEmpty(data.prac_name) && data.prac_name !== undefined ? data.prac_name : '';
    data.prac_duration = !isEmpty(data.prac_duration) && data.prac_duration !== undefined ? data.prac_duration : '';
    if (Validator.isEmpty(data.prac_name)) {
        errors.prac_name = 'Kindly enter a practical Name';
    }
    if (Validator.isEmpty(data.prac_duration)) {
        errors.prac_duration = 'Enter  duration';
    }


    return {
        errors,
        isValid: isEmpty(errors)
    }
}


