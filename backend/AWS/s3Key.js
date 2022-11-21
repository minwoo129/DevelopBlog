const key = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_UPLOAD_REGION,
  bucket: process.env.AWS_S3_UPLOAD_BUCKET,
};

module.exports = key;
