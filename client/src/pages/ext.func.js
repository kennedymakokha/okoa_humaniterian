

  const generateCSV = (data) => {
    const headers = Object.keys(data[0]);
    const csvRows = [
      headers.join(','), // Add header row
      ...data.map(row => headers.map(fieldName => JSON.stringify(row[fieldName], (key, value) => value === null ? '' : value)).join(',')) // Convert each row to a CSV string
    ].join('\n');

    return csvRows;
  };

  export const downloadCSV = (data,name) => {
    const csvData = generateCSV(data);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.setAttribute('href', URL.createObjectURL(blob));
    link.setAttribute('download', `${name.replace(/ /g,"_")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };