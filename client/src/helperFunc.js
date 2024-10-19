
import * as XLSX from 'xlsx';
export function calculateAge(dob) {
    // Convert the date of birth to a Date object
    var birthDate = new Date(dob);
    // Get the current date
    var currentDate = new Date();
    // Calculate the difference in milliseconds
    var ageInMilliseconds = currentDate - birthDate;
    // Convert the difference to a Date object
    var ageDate = new Date(ageInMilliseconds);
    // Extract the year from the ageDate and subtract 1970 to get the age
    var age = ageDate.getUTCFullYear() - 1970;
    return age;
}

export function truncateString(str, num) {
    if (str?.length > num) {
        return str?.slice(0, num) + '...';
    } else {
        return str;
    }
}

export const exportToExcel = (data,title) => {
    // Convert data to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, title);

    // Export the workbook
    XLSX.writeFile(workbook, `${title.replace(/\s+/g, '')}.xlsx`);
    // XLSX.writeFile(workbook, 'UsersData.xlsx');
};