import Validator from 'validator';
import isEmpty from './isEmpty.js';

export const validateTriageInput = (data) => {

    let errors = {};
    data.temp = !isEmpty(data.temp) && data.temp !== undefined ? data.temp : '';
    data.bloodpressure = !isEmpty(data.bloodpressure) && data.bloodpressure !== undefined ? data.bloodpressure : '';
    data.height = !isEmpty(data.height) && data.height !== undefined ? data.height : '';
    data.bloodsugar = !isEmpty(data.bloodsugar) && data.bloodsugar !== undefined ? data.bloodsugar : '';
    data.weight = !isEmpty(data.weight) && data.weight !== undefined ? data.weight : '';
    if (Validator.isEmpty(data.temp)) {
        errors.temp = 'Enter Temperature';
    }
    if (Validator.isEmpty(data.bloodpressure)) {
        errors.bloodpressure = 'Enter Blood Presure';
    }

    if (Validator.isEmpty(data.height)) {
        errors.height = 'Enter height';
    }

    if (Validator.isEmpty(data.bloodsugar)) {
        errors.bloodsugar = 'Enter Blood sugar';
    }

    if (Validator.isEmpty(data.weight)) {
        errors.weight = 'Enter Blood sugar';
    }


    return {
        errors,
        isValid: isEmpty(errors)
    }
}


