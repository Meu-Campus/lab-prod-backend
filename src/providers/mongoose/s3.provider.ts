import { S3Client } from "@aws-sdk/client-s3";
import { environment } from "@src/environment";

export class S3Provider {
  getS3() {
    return new S3Client({
      region: environment.awsRegion,
      endpoint: environment.awsR2Endpoint,
      credentials: {
        accessKeyId: environment.awsAccessKeyId!,
        secretAccessKey: environment.awsSecretAccessKey!
      }
    })
  }
}