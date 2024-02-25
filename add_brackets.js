const fs = require('fs');


fs.readdir("./1_first_round", async (err, files) => {
  let newStr = "";
  files.forEach(file => {
    const data = fs.readFileSync(`./1_first_round/${file}`);
    let str = data.toString();

    if (str[1] === ",") {
      str = str.substring(2);
      newStr = "[" + str;
    }
    else {
      newStr = str;
    }
    // newStr = "[" + str + "]";
    fs.writeFileSync(`./1_first_round/${file}`, newStr, (err) => {
      if (err) {
        console.log("error : ", err);
      }
      else {
        console.log("finished : ", file);
      }
    })
  });
});