const s3 = require("../clients/aws");
const path = require("path");
const debug = require("debug")("hamster-s3:services:aws");

const uploadFile = (file, filePath = null, fileName = null) => {
    debug(`Uploading file to AWS: ${file.originalname}`);

    return new Promise((resolve, reject) => {
        let file_path = "";

        if (filePath) {
            file_path = filePath;

            while (typeof file_path === "string" && file_path[0] === "/") {
                file_path = file_path.substring(1);
            }
        }
        const file_name = fileName || file.originalname;

        if (!file_name) {
            throw new Error("Invalid file");
        }

        const file_extension = fileName !== null ? path.extname(file.originalname) : "";

        const final_name = file_path + file_name + file_extension;

        debug(`Final name: ${final_name}`);

        const payload = {
            Key: final_name,
            Body: new Buffer.from(file.buffer, "binary"),
            ContentType: file.mimetype,
            Bucket: process.env.AWS_BUCKET,
        };

        s3.upload(payload, (err, data) => {
            try {
                if (err) {
                    debug(`${file.originalname} -> ${payload.Key} uploading - error`);
                    return reject(err);
                }

                debug(`${file.originalname} -> ${payload.Key} uploading - success`);

                resolve(data.Key);
            } catch (error) {
                debug(`${file.originalname} -> ${payload.Key} uploading - error`);
                resolve(false);
            }
        });
    });
};

const getFileStream = (res = null, filePath = null) => {
    try {
        let file_path = "";

        if (filePath) {
            file_path = filePath;

            while (typeof file_path === "string" && file_path[0] === "/") {
                file_path = file_path.substring(1);
            }
        }

        const stream = s3
            .getObject({
                Bucket: process.env.AWS_BUCKET,
                Key: file_path,
            })
            .createReadStream()
            .on("error", error => {
                res.sendStatus(404);
            });

        stream.pipe(res);
    } catch (error) {
        throw new Error("File not found");
    }
};

const health = () => {
    return new Promise((resolve, reject) => {
        s3.listBuckets(function(err, data) {
            if (err) {
                resolve("error");
            } else {
                resolve(!!data.Buckets ? "ok" : "error");
            }
        });
    });
};

module.exports = {
    uploadFile,
    getFileStream,
    health,
};
