import { BadRequestException, Injectable, UploadedFiles } from '@nestjs/common';
import * as FormData from 'form-data';
import axios from 'axios';
import { Readable } from 'stream';

import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class ImageService {
    async uploadImages(files: Express.Multer.File[]) {
        if (!files || files.length === 0) {
          throw new BadRequestException(['No images uploaded']);
        }
    
        const imgBBUrl = process.env.IMGBB_URL;
        const queryParams = {
            key: process.env.IMGBB_API_KEY,
        }
        const uploadPromises = files.map(async (file) => {
          const formData = new FormData();
          const stream = Readable.from(file.buffer);
          formData.append('image', stream, file.originalname);
    
          try {
            const response = await axios.post(imgBBUrl, formData, {
                headers: {
                    ...formData.getHeaders(),
                },
                params: queryParams
            });

            const data = {
                id: response.data.data.id,
                url: response.data.data.image.url,
                deleteUrl: response.data.data.delete_url,
            };
            return data;
          } catch (error) {
            throw new BadRequestException(['Upload images failed']);
          }
        });
    
        const uploadedUrls = await Promise.all(uploadPromises);
        const successfulUploads = uploadedUrls.filter(url => url !== null);
    
        return { urls: successfulUploads };
    }
}