const config = require("./config");
const app = require("./app.js");
const port = config.get("port");

console.log("Mon Fri 2:30 pm - 8 pm / Tues 11 am - 2 pm / Weds 1:15 pm - 3:15 am / Thurs 10 am - 3:15 am / Sat 5 am - 11:30 am / Sun 10:45 am - 5 pm".split("/")[0].split(",")[0].replace(/\s/g, ""))

app.listen(port, () => {
  console.log(`server running on port: ${port}`);
});
