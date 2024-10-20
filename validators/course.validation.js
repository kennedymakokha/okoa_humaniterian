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


export const validateDataTestInput = (data) => {

    let errors = {};
    data.student = !isEmpty(data.student) && data.student !== undefined ? data.student : '';
    data.test = !isEmpty(data.test) && data.test !== undefined ? data.test : '';
    data.course_duration = !isEmpty(data.course_duration) && data.course_duration !== undefined ? data.course_duration : '';
    if (Validator.isEmpty(data.student)) {
        errors.student = 'Kindly select a student`';
    }
    if (Validator.isEmpty(data.student)) {
        errors.student = 'Kindly enter a course Name';
    }
    if (Validator.isEmpty(data.course_duration)) {
        errors.course_duration = 'Enter course duration';
    }


    return {
        errors,
        isValid: isEmpty(errors)
    }
}
