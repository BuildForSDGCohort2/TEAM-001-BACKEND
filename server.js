const express = require("express");
const bodyParser = require("body-parser");
const { PORT, url } = require("./config/env");
require("./config/database")();
const fileUpload = require("express-fileupload");

const app = express();

app.use(fileUpload());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/sender", require("./src/routes/sender.route"));
app.use("/api/v1/agent", require("./src/routes/agent.route"));

app.listen(PORT, () => console.log(`Server is started on ${url}:${PORT}`));
