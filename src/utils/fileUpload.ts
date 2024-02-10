import { Request } from 'express';
import multer, { Multer } from 'multer';
import path from 'path';
import { randomUUID } from 'crypto';
import { badData } from '@hapi/boom';

const allowedVideoFormats = [
  'video/mp4',
]

const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
    console.log(file.mimetype)
    const error = allowedVideoFormats.includes(file.mimetype)? null: badData('Service only allows mp4 format so far');
    cb(error, 'videos/'); 
  },
  filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    const uniqueSuffix: string = randomUUID() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const videoUpload: Multer = multer({ storage: storage });

export {
  videoUpload
}
