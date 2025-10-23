import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class UploadService {
  constructor(private configService: ConfigService) {
    // Configure Cloudinary
    cloudinary.config({
      cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET'),
    });
  }

  async uploadFile(file: Express.Multer.File, folder: string = 'emergencies'): Promise<string> {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    // Validate file type
    const allowedMimeTypes = [
      'image/jpeg',
      'image/png',
      'image/jpg',
      'image/gif',
      'image/webp',
      'video/mp4',
      'video/mpeg',
      'video/quicktime',
      'video/x-msvideo',
      'video/webm',
      'audio/mpeg',
      'audio/wav',
      'audio/ogg',
      'audio/webm',
      'audio/mp3',
      'audio/mp4',
      'audio/x-m4a',
      'audio/m4a',
    ];

    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException('Invalid file type. Only images, videos, and audio files are allowed.');
    }

    // Validate file size (max 100MB for Cloudinary free tier)
    const maxSize = 100 * 1024 * 1024; // 100MB
    if (file.size > maxSize) {
      throw new BadRequestException('File size exceeds 100MB limit');
    }

    try {
      // Determine resource type based on file type
      const resourceType = this.getResourceType(file.mimetype);

      // Upload to Cloudinary
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: folder,
            resource_type: resourceType,
            use_filename: true,
            unique_filename: true,
          },
          (error, result) => {
            if (error) {
              console.error('Error uploading to Cloudinary:', error);
              reject(new BadRequestException('Failed to upload file to cloud storage'));
            } else if (result) {
              resolve(result.secure_url);
            } else {
              reject(new BadRequestException('Upload failed - no result returned'));
            }
          }
        );

        // Write buffer to stream
        uploadStream.end(file.buffer);
      });
    } catch (error) {
      console.error('Error uploading file to Cloudinary:', error);
      throw new BadRequestException('Failed to upload file to cloud storage');
    }
  }

  async deleteFile(fileUrl: string): Promise<void> {
    try {
      // Extract public_id from Cloudinary URL
      const publicId = this.extractPublicId(fileUrl);
      
      if (!publicId) {
        throw new BadRequestException('Invalid Cloudinary URL');
      }

      // Determine resource type from URL
      const resourceType = this.getResourceTypeFromUrl(fileUrl);

      await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
    } catch (error) {
      console.error('Error deleting file from Cloudinary:', error);
      throw new BadRequestException('Failed to delete file from cloud storage');
    }
  }

  getMediaType(mimetype: string): string {
    if (mimetype.startsWith('image/')) return 'image';
    if (mimetype.startsWith('video/')) return 'video';
    if (mimetype.startsWith('audio/')) return 'audio';
    return 'other';
  }

  private getResourceType(mimetype: string): 'image' | 'video' | 'raw' {
    if (mimetype.startsWith('image/')) return 'image';
    if (mimetype.startsWith('video/')) return 'video';
    return 'raw'; // For audio and other files
  }

  private getResourceTypeFromUrl(url: string): 'image' | 'video' | 'raw' {
    if (url.includes('/image/')) return 'image';
    if (url.includes('/video/')) return 'video';
    return 'raw';
  }

  private extractPublicId(url: string): string | null {
    try {
      // Cloudinary URL format: https://res.cloudinary.com/{cloud_name}/{resource_type}/upload/v{version}/{public_id}.{format}
      const parts = url.split('/upload/');
      if (parts.length < 2) return null;

      const pathParts = parts[1].split('/');
      // Remove version (v123456) if present
      const relevantParts = pathParts.filter(part => !part.startsWith('v') || isNaN(Number(part.substring(1))));
      
      // Join remaining parts and remove file extension
      const publicIdWithExt = relevantParts.join('/');
      const lastDotIndex = publicIdWithExt.lastIndexOf('.');
      
      return lastDotIndex > 0 ? publicIdWithExt.substring(0, lastDotIndex) : publicIdWithExt;
    } catch (error) {
      console.error('Error extracting public_id:', error);
      return null;
    }
  }
}
