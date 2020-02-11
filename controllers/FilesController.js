const { respond } = require("../helpers");
const { aws, cloudflare } = require("../services");
const debug = require("debug")("hamster-s3:controllers:filesController");

const uploadFile = async (req, res) => {
    try {
        let uploaded = await aws.uploadFile(req.file, req.body.path || "", req.body.name || "");

        if (uploaded) {
            let cache = await cloudflare.emptyFileCache(process.env.APP_URL + req.originalUrl);

            return respond(res, {
                data: {
                    path: uploaded,
                    full_path: process.env.APP_URL + "/" + uploaded,
                    cache_cleared: cache,
                },
            });
        } else {
            return respond(res, {
                code: 400,
                message: "Error uploading file",
            });
        }
    } catch (error) {
        console.log(error);
        return respond(res, {
            code: 400,
            message: error.message,
        });
    }
};

const getFileStream = async (req, res) => {
    debug("Getting file stream");
    try {
        aws.getFileStream(res, req.originalUrl);
    } catch (error) {
        res.sendStatus(404);
    }
};

module.exports = {
    uploadFile,
    getFileStream,
};
