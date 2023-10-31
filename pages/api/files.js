import path from "path";
const fs = require("fs");
const { parse } = require("csv-parse");

async function handler(req, res) {
  if (req.method === "GET") {
    const data = [];

    const filePath = path.join(process.cwd(), "data", "data.csv");

    fs.createReadStream(filePath)
      .pipe(parse({ delimiter: ";", from_line: 1 }))
      .on("data", function (row) {
        if (row.length > 1) {
          data.push({ createdAt: row[0], fileName: row[1] });
        }
      })
      .on("error", function (error) {
        console.log(error.message);
      })
      .on("end", function () {
        res.status(200).send(data);
      });
  }
}

export default handler;
