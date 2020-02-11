module.exports = express => {
    const filesController = require("../../controllers/FilesController");
    const r = express.Router();
    const { multer } = require("../middlewares");

    r.get("*", filesController.getFileStream);
    r.post("/", multer.single("toUpload"), filesController.uploadFile);

    return r;
};
