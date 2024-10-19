export const Makeid = (length) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}


export const MakeActivationCode = (length) => {
    var result = '';
    var characters = '123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

export const Format_phone_number = (phone_number) => {

    let Refined
    if (phone_number.charAt(0) === "0") {
        let newPhone = phone_number.slice(1);
        Refined = "+254".concat(newPhone)
        return Refined
    }
    else if (phone_number.substring(0, 4) === "+254") {
        return phone_number
    }

}
export const isEmpty = (value) => {
    return (
        value === undefined ||
        value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0)
    );
}
export const emailIsValid = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
// module.exports = { Makeid, MakeActivationCode, Format_phone_number, emailIsValid, isEmpty }


export const ValidityFunc = (date, num) => {

    var startDate = date;
    startDate = new Date(startDate.replace(/-/g, "/"));
    var endDate = "", noOfDaysToAdd = num, count = 0;
    while (count < noOfDaysToAdd) {
        endDate = new Date(startDate.setDate(startDate.getDate() + 1));
        if (endDate.getDay() != 0 && endDate.getDay() != 6) {
            //Date.getDay() gives weekday starting from 0(Sunday) to 6(Saturday)
            count++;
        }
    }
    return endDate
}