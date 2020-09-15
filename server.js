const express = require("express");
const bodyParser = require("body-parser");
const { PORT, url } = require("./config/env");
require("./config/database")();

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/sender", require("./src/routes/sender.route"));

app.listen(PORT, () => console.log(`Server is started on ${url}:${PORT}`));
