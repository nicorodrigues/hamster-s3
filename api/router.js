module.exports = express => {
    const r = express.Router();
    // const { something } = require("./middlewares");
    const { health, files } = require("./routes")(express);
    const { respond } = require("../helpers");

    // // Middlewares
    // r.use("*", something);

    // Routes
    r.use("/health", health);
    r.use("/", files);

    // Default route
    r.use(function(_, res) {
        respond(res, {
            code: 404,
            message: "Endpoint doesn't exist",
        });
    });

    return r;
};
