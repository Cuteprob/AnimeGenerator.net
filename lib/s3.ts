import { generateNanoIdFilename } from "@/lib/utils"
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import axios from "axios";

export async function downloadAndUploadImage(imageUrl:string) {
    const s3 = new S3Client({
        region: "auto",
        endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
        credentials: {
            accessKeyId: `${process.env.R2_ACCESS_KEY_ID}`,
            secretAccessKey: `${process.env.R2_SECRET_ACCESS_KEY}`,
          },
    })

    try {
        const response = await axios({
            method: 'GET',
            url: imageUrl,
            responseType: 'arraybuffer',
        });
        
        const s3ImageFileName = generateNanoIdFilename("png");

        const uploadParams = new PutObjectCommand({
            Bucket: process.env.R2_BUCKET_NAME,
            Key: s3ImageFileName,
            Body: response.data,
        });

        const ret = await s3.send(uploadParams);
        return getPublicObjectUrl(s3ImageFileName);
    } catch (error) {
        console.log("upload failed: ", error);
        throw error;
    }
}

export function getPublicObjectUrl (s3ImageFileName: string){
    return `https://${process.env.R2_PUBLIC_DOMAIN}/${s3ImageFileName}`
}