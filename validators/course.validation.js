import Validator from 'validator';
import isEmpty from './isEmpty.js';

export const validateCourseInput = (data) => {

    let errors = {};
    data.course_name = !isEmpty(data.course_name) && data.course_name !== undefined ? data.course_name : '';
    data.course_duration = !isEmpty(data.course_duration) && data.course_duration !== undefined ? data.course_duration : '';
    if (Validator.isEmpty(data.course_name)) {
        errors.course_name = 'Kindly enter a course Name';
    }
    if (Validator.isEmpty(data.course_duration)) {
        errors.course_duration = 'Enter course duration';
    }


    return {
        errors,
        isValid: isEmpty(errors)
    }
}
