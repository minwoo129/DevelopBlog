import AWS, { Credentials } from "aws-sdk";
import { AWSINFO } from "../../config";
import path from "path";
import S3 from "aws-sdk/clients/s3";

export const AWSFileUpload = async (blob: Blob) => {
  const { ACCESS_KEY_ID, S3_UPLOAD_BUCKET, SECRET_ACCESS_KEY, UPLOAD_REGION } =
    AWSINFO;
  const endpoint = new AWS.Endpoint(
    "https://developblog.s3.ap-northeast-2.amazonaws.com"
  );
  AWS.config.update({
    region: UPLOAD_REGION,
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  });

  const access = new Credentials({
    accessKeyId: `${ACCESS_KEY_ID}`,
    secretAccessKey: `${SECRET_ACCESS_KEY}`,
  });

  const s3 = new AWS.S3({
    endpoint,
    credentials: access,
    region: "ap-northeast-2",
  });
  const upload = new AWS.S3.ManagedUpload({
    params: {
      Bucket: "developblog",
      Key: `${Date.now()}_test.jpg`,
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
