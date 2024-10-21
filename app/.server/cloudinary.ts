import { writeAsyncIterableToWritable } from '@remix-run/node';
import cloudinary, { type UploadApiResponse } from 'cloudinary';

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export async function uploadDocument(data: AsyncIterable<Uint8Array>, folderPath: string) {
  const uploadPromise = new Promise<UploadApiResponse>(async (resolve, reject) => {
    const uploadStream = cloudinary.v2.uploader.upload_stream(
      {
        resource_type: 'raw',
        folder: folderPath,
        overwrite: true,
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        if (result) {
          resolve(result);
        } else {
          reject(new Error('Upload failed'));
        }
      }
    );
    await writeAsyncIterableToWritable(data, uploadStream);
  });

  return uploadPromise;
}
