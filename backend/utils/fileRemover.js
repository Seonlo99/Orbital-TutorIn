import fs from "fs";
import path from "path";

const fileRemover = (filename) => {
  fs.unlink(path.join(__dirname, "../uploads", filename), function (err) {
    if (err && err.code == "ENOENT") {
      // file doesnt exist
      console.log(`File ${filename} doesnt exist, wont remove it.`);
    } else if (err) {
      console.log(`Error occured while trying to remove file ${filename}`);
    } else {
      console.log(`removed ${filename}`);
    }
  });
};

export { fileRemover };
