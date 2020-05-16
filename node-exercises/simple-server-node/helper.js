const concat = require("concat-stream");
const url = require("url");
const parseBody = async req => {
  console.log("data");
  if (req.headers["content-type"] === "application/json") {
    await req.pipe(
      concat(data => {
        console.log(JSON.parse(data));
        return JSON.parse(data);
      })
    );
  }
};

const parseQuery = url => {
  const parsedUrl = url.parse(req.url, true).query;
  console.log(parsedUrl);
  return parsedUrl;
};

module.exports = { parseBody, parseQuery };
