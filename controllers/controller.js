const aws = require("aws-sdk");
require("dotenv").config();

const { uploadFile } = require("../upload");

aws.config.update({
	secretAccessKey: process.env.ACCESS_KEY,
	accessKeyId: process.env.ACCESS_KEY_ID,
	region: process.env.REGION,
});

const s3 = new aws.S3();
const BUCKET = process.env.BUCKET;
const basePath = process.env.BASE_PATH;

const uploadToS3Bucket = async (req, res, next) => {
	try {
		const result = await uploadFile(req);
		res.status(200).json({
			message: "File uploaded successfully 🤝",
			data: result.Location,
		});
	} catch (error) {
		next(error);
	}
};

const getFiles = async (req, res, next) => {
	const path = basePath + req.params.folderName;
	try {
		let response = await s3
			.listObjectsV2({ Bucket: BUCKET, Prefix: path })
			.promise();

		console.log(response);
		let fileNames = response.Contents.filter((item) => item.Size > 0);
		res.status(200).json({
			message: "Success 🤝",
			data: fileNames,
		});
	} catch (error) {
		next(error);
	}
};

const getFolders = async (req, res, next) => {
	let folders = [];

	try {
		let response = await s3
			.listObjectsV2({ Bucket: BUCKET, Prefix: basePath, Delimiter: "/" })
			.promise();
		response.CommonPrefixes.map((folder) => {
			return folders.push(folder.Prefix.split("/")[1]);
		});
		res.status(200).json({
			message: "Success 🤝",
			data: folders,
		});
	} catch (error) {
		next(error);
	}
};

const getFile = async (req, res, next) => {
	const { folderName, fileName } = req.params;
	console.log(fileName, folderName);
	try {
		let response = await s3
			.getObject({
				Bucket: BUCKET,
				Key: basePath + folderName + "/" + fileName,
			})
			.promise();
		res.send(response.Body);
	} catch (error) {
		next(error);
	}
};

const deleteEntity = async (req, res, next) => {
	let key;

	if (req.params.filename) {
		key = basePath + req.params.folderName + "/" + req.params.filename;
	} else {
		key = basePath + req.params.folderName + "/";
	}

	try {
		let response = await s3
			.deleteObject({ Bucket: BUCKET, Key: key })
			.promise();

		res.status(200).json({
			message: "Success 🤝",
			data: key,
		});
	} catch (error) {
		next(error);
	}
};

//export all  controllers

exports.deleteEntity = deleteEntity;
exports.getFile = getFile;
exports.getFolders = getFolders;
exports.getFiles = getFiles;
exports.uploadFile = uploadToS3Bucket;
