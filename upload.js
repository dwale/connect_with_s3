const BUCKET = process.env.BUCKET;
const basePath = process.env.BASE_PATH;

const aws = require("aws-sdk");
const fs = require("fs");

aws.config.update({
	secretAccessKey: process.env.ACCESS_KEY,
	accessKeyId: process.env.ACCESS_KEY_ID,
	region: process.env.REGION,
});
const s3 = new aws.S3();

const uploadFile = (request) => {
	const fileStream = fs.createReadStream(request.file.path);

	const params = {
		Bucket: BUCKET,
		Body: fileStream,
		Key: basePath + request.body.folderName + "/" + request.body.fileName,
	};

	return s3.upload(params).promise();
};

exports.uploadFile = uploadFile;
