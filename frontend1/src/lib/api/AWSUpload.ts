import AWS, { Credentials } from "aws-sdk";
import { AWSINFO } from "../../config";
import path from "path";
import S3 from "aws-sdk/clients/s3";

export const AWSFileUpload = async (blob: Blob) => {
  const { ACCESS_KEY_ID, S3_UPLOAD_BUCKET, SECRET_ACCESS_KEY, UPLOAD_REGION } =
    AWSINFO;

  AWS.config.update({
    region: UPLOAD_REGION,
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  });
  const upload = new AWS.S3.ManagedUpload({
    params: {
      Bucket: "ap-northeast-2",
      Key: `original/${Date.now()}_test.jpg`,
      Body: blob,
    },
  });

  const result = upload.promise();
  result
    .then((res) => {
      console.log("AWSupload res: ", res);
    })
    .catch((e) => {
      console.log("AWSUpload err: ", e);
    });
};
