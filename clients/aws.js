// Load the SDK and UUID
let AWS = require("aws-sdk");

var s3 = new AWS.S3({ apiVersion: "2006-03-01", accessKeyId: process.env.AWS_CLIENT_KEY, secretAccessKey: process.env.AWS_CLIENT_SECRET });

module.exports = s3;
