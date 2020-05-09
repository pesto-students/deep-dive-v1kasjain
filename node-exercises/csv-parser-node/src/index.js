const { csvToJSON, JSONToCsv } = require("./parser");

async function logger(asyncIterable) {
  for await (const row of asyncIterable) {
    console.log(row);
  }
}

function headerToUppercase(str) {
  return str.toUpperCase();
}

logger(
  csvToJSON("sample-semicolon.csv", {
    includeHeaders: true,
    delimiter: ";",
    headerTransformation: headerToUppercase
  })
);
// logger(csvToJSON('sample.csv', {includeHeaders: false }));
// logger(csvToJSON('sample.csv', {includeHeaders: true, headerTransformation: headerToUppercase }));
// logger(
//     JSONToCsv("sample.json", {
//     includeHeaders: true,
//     delimiter: ";",
//     headerTransformation: headerToUppercase
//   })
// );
