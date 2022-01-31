const express = require("express");
const router = express.Router();
require("dotenv").config();
const multer = require("multer");

const controllers = require("../controllers/controller");
const upload = multer({ dest: "uploads/" });

//Routes
router.post(
	"/upload/:folderName/:fileName",
	upload.single("file"),
	controllers.uploadFile
);
router.get("/list/files/:folderName", controllers.getFiles);
router.get("/download/:folderName/:fileName", controllers.getFile);
router.get("/delete/:folderName/:filename?", controllers.deleteEntity);
router.get("/list/folders", controllers.getFolders);

module.exports = router;
