


export const NumericalExists = (pass) => {
    if (/\d/.test(pass)) {
        return true
    }
}

export const isUpper = (str) => {
    if (/[a-z]/.test(str) && /[A-Z]/.test(str))
        return true;
}
export const isSpecial = (str) => {
    if (/[#?!@$%^&*-]/.test(str))
        return true;
}



// .matches(/(?=.*?[A-Z])/).withMessage('At least one Uppercase')
//     .matches(/(?=.*?[a-z])/).withMessage('At least one Lowercase')
//     .matches(/(?=.*?[0-9])/).withMessage('At least one Number')
//     .matches(/(?=.*?[#?!@$%^&*-])/).withMessage('At least one special character')