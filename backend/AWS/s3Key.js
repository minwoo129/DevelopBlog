const key = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "ap-northeast-2",
  uploadBucket: process.env.AWS_S3_UPLOAD_BUCKET,
};

module.exports = key;
