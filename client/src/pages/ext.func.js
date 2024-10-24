

const generateCSV = (data) => {
  const headers = Object.keys(data[0]);
  const csvRows = [
    headers.join(','), // Add header row
    ...data.map(row => headers.map(fieldName => JSON.stringify(row[fieldName], (key, value) => value === null ? '' : value)).join(',')) // Convert each row to a CSV string
  ].join('\n');

  return csvRows;
};

export const downloadCSV = (data, name) => {
  const csvData = generateCSV(data);
  const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.setAttribute('href', URL.createObjectURL(blob));
  link.setAttribute('download', `${name.replace(/ /g, "_")}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const Repeat = (n, body) => {
  let result = []
  for (let index = 0; index < n; index++) {
    result.push((body))

  }
  return result

  // For(let i = 0; i < products.length; i++) {
  //   result.push((
  //     <div className="col-md-3">
  //       <div className="card">
  //         <Link to={products[i].link}><img className="card-img-top" src={products[i].image} alt="Card cap" /></Link>
  //         <div className="card-body">
  //          <h5 className="card-title"> 
  //            {products[i].name}
  //          </h5>
  //          <p className="card-text"> 
  //           {products[i].description}
  //          </p>
  //        </div>
  //      </div>
  //    </div >
  //      ));
  // }

  // return result
}