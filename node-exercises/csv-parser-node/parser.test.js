const {
  csvToJSON,
  JSONToCsv,
  removeComment,
  findEOLIndex,
  prepareJSONObject
} = require("./src/parser");

describe("removeComment", () => {
  test("should remove comment from given string", () => {
    expect(removeComment("example string with #comment")).toBe(
      "example string with"
    );
  });

  test("should findEOL if there is new line", () => {
    expect(findEOLIndex("line one with new line\nline2")).toBe(22);
  });

  test("should findEOL if there is carriage return", () => {
    expect(findEOLIndex("line one with carriage return\rline2")).toBe(29);
  });

  test("should parse json object from given string", () => {
    const header = ["first", "second", "third"];
    const string = "one, two, three";
    const delimiter = ",";
    expect(prepareJSONObject(string, delimiter)).toEqual({
      first: "one",
      second: "two",
      third: "three"
    });
  });
});
