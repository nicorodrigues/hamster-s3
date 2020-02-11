require("dotenv").config();
const Express = require("express");
const app = Express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const debug = require("debug")("hamster-s3:main");
const router = require("../api/router.js")(Express);

debug("App starting");

app.use(morgan(process.env.APP_ENV === "production" ? "combined" : "dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);

app.listen(process.env.APP_PORT, console.log(`Starting API on port ${process.env.APP_PORT}`));

debug(`App started on port ${process.env.APP_PORT}`);
