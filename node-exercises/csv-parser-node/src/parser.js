const fs = require("fs");

const config = {
  includeHeaders: false,
  delimiter: ",",
  headerTransformation: null
};

let header = [];

function updateDefaultConfig(options) {
  if (options.includeHeaders) {
    config.includeHeaders = options.includeHeaders;
  }

  if (options.delimiter) {
    config.delimiter = options.delimiter;
  }

  if (options.headerTransformation) {
    config.headerTransformation = options.headerTransformation;
  }
}

function getReadStreamFromFilePath(csvFilePath) {
  //TODO: Check for valid file extension
  return fs.createReadStream(csvFilePath);
}

function removeComment(row) {
  if (row.length > 0 && row.indexOf("#") > -1) {
    row = row.slice(0, row.indexOf("#"));
    return row.trim();
  } else {
    return row;
  }
}

function prepareJSONArray(row, delimiter) {
  let JSONRow = [];
  const rowArray = row.split(delimiter);
  if (config.headerTransformation) {
    rowArray.map(rowColumns => {
      JSONRow.push(config.headerTransformation(rowColumns.toString()));
    });
  } else {
    rowArray.map(rowColumns => {
      JSONRow.push(rowColumns.toString());
    });
  }
  return JSONRow;
}

function prepareJSONObject(row, delimiter) {
  let JSONObject = {};
  row.split(delimiter).map((rowColumns, index) => {
    JSONObject[header[index]] = rowColumns;
  });

  return JSONObject;
}

function findEOLIndex(chunk) {
  let eolIndex = -1;
  if (chunk.indexOf("\r") > -1) {
    eolIndex = chunk.indexOf("\r");
  } else if (chunk.indexOf("\n") > -1) {
    eolIndex = chunk.indexOf("\n");
  }
  return eolIndex;
}

async function* csvToJSON(csvFilePath, options = false) {
  const csv = getReadStreamFromFilePath(csvFilePath);
  csv.setEncoding("utf8");

  if (options) {
    updateDefaultConfig(options);
  }

  const { includeHeaders, delimiter } = config;
  let lastChunk = "";
  if (includeHeaders === true) {
    let headerPulled = false;
    for await (const data of csv) {
      lastChunk += data;
      while (true) {
        const eolIndex = findEOLIndex(lastChunk);
        if (eolIndex < 0) {
          break;
        }

        if (headerPulled === false) {
          header = prepareJSONArray(lastChunk.slice(0, eolIndex), delimiter);
          headerPulled = true;
          lastChunk = lastChunk.slice(eolIndex + 1);
          continue;
        }

        let row = lastChunk.slice(0, eolIndex);
        row = removeComment(row.trim());
        if (row) {
          yield prepareJSONObject(row, delimiter);
        }

        lastChunk = lastChunk.slice(eolIndex + 1);
      }
    }

    if (lastChunk.length > 0) {
      yield prepareJSONObject(lastChunk, delimiter);
    }
  } else {
    for await (const data of csv) {
      lastChunk += data;
      while (true) {
        const eolIndex = findEOLIndex(lastChunk);
        if (eolIndex < 0) {
          break;
        }

        let row = lastChunk.slice(0, eolIndex);
        row = removeComment(row.trim());
        if (row) {
          yield prepareJSONArray(row, delimiter);
        }
        lastChunk = lastChunk.slice(eolIndex + 1);
      }
    }

    if (lastChunk.length > 0) {
      yield prepareJSONArray(lastChunk, delimiter);
    }
  }
}

async function* JSONToCsv(JSONFilePath, options = false) {
  const JSON = getReadStreamFromFilePath(JSONFilePath);
  JSON.setEncoding("utf8");

  if (options) {
    updateDefaultConfig(options);
  }

  const { includeHeaders, delimiter } = config;
  let lastChunk = "";
  for await (const chunk of JSON) {
    yield chunk;
  }
}

module.exports = {
  csvToJSON,
  JSONToCsv,
  removeComment,
  findEOLIndex,
  prepareJSONObject
};
