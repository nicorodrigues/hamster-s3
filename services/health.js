const cf = require("./cloudflare");
const aws = require("./aws");

const checkEverything = async () => {
    const status = {
        api: "ok",
        cloudflare: "error",
        aws: "error",
    };

    try {
        status.cloudflare = await cf.health();
        status.aws = await aws.health();
    } catch (error) {}

    return status;
};

module.exports = {
    checkEverything,
};
