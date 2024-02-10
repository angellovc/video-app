import { User } from "@/entities/user.entity";
import { getUserFromToken } from "@/middlewares/auth/jwtToken";
import { Validation, validateSchema } from "@/middlewares/validations/schemaValidation";
import { patchUserSchema } from "@/schemas/user.schema";
import { paramsVideoSchema, postVideoSchema, putVideoSchema } from "@/schemas/video.schema";
import { createVideo, deleteVideo, getVideoById, getVideos, updateVideo } from "@/services/video.service";
import { videoUpload } from "@/utils/fileUpload";
import { notFound, unauthorized } from "@hapi/boom";
import { NextFunction, Request, Response, Router } from "express";
import * as fs from "fs";
import passport from "passport";


const router = Router();


router.get('/',
  async (_, response:Response, next:NextFunction) => {
  try {
    const videos = await getVideos();
    response.json(videos);
  } catch(error) {
    next(error);
  }
});

router.get('/:videoId',
  getUserFromToken,
  async (request:Request, response:Response, next:NextFunction) => {
    const videoMetadata = await getVideoById(request.params.videoId)
    if (videoMetadata.isPublic === false && request.user === undefined)
      next(unauthorized(`You must be logged in order to watch the video`));

    const filePath = `videos/${videoMetadata.filename}`;
    try {
      const stat = fs.statSync(filePath);
      if(!stat){
        next(notFound(`There's no video with id ${videoMetadata.filename}`));
      }
  
      const fileSize = stat.size;
      const range = request.headers.range;
  
      if(range){
          const parts = range.replace(/bytes=/, '').split('-')
          const start = parseInt(parts[0], 10);
          const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
  
          const chunksize = end - start + 1;
          const file = fs.createReadStream(filePath, {start, end});
          const head = {
              'Content-Range': `bytes ${start}-${end}/${fileSize}`,
              'Accept-Ranges': 'bytes',
              'Content-Length': chunksize,
              'Content-Type': 'video/mp4'
          };
          response.writeHead(206, head);
          file.pipe(response);
      }
      else{
          const head = {
              'Content-Length': fileSize,
              'Content-Type': 'video/mp4'
          };
          response.writeHead(200, head);
          fs.createReadStream(filePath).pipe(response);
      };
    } catch(error) {
      next(error);
    }
});

router.post('/',
  passport.authenticate('jwt', {session: false}),
  validateSchema(Validation.BODY, postVideoSchema),
  async (request:Request, response:Response, next:NextFunction) => {
  try {
    const video = await createVideo(request.body);
    response.json(video);
  } catch(error) {
    next(error);
  }
});

router.put('/:videoId',
  passport.authenticate('jwt', {session: false}),
  validateSchema(Validation.PARAMS, paramsVideoSchema),
  validateSchema(Validation.BODY, putVideoSchema),
  async (request:Request, response:Response, next:NextFunction) => {
    try {
      const user = request.user as User;
      const video = await updateVideo(
        request.params.videoId,
        user.id,
        request.body
      );
      response.json(video);
    } catch(error) {
      next(error);
    }
});

router.patch('/:videoId',
  passport.authenticate('jwt', {session: false}),
  validateSchema(Validation.PARAMS, paramsVideoSchema),
  validateSchema(Validation.BODY, patchUserSchema),
  async (request:Request, response:Response, next:NextFunction) => {
    try {
      const user = request.user as User;
      const video = await updateVideo(
        request.params.videoId,
        user.id,
        request.body
      );
      response.json(video);
    } catch(error) {
      next(error);
    }
});

router.delete('/:videoId',
  passport.authenticate('jwt', {session: false}),
  validateSchema(Validation.PARAMS, paramsVideoSchema),
  async (request:Request, response:Response, next:NextFunction) => {
    try {
      const user = request.user as User;
      const video = await deleteVideo(
        request.params.videoId,
        user.id
      );
      response.json(video);
    } catch(error) {
      next(error);
    }
});

router.post('/upload',
  passport.authenticate('jwt', {session: false}),
  videoUpload.single('video'), (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  res.status(200).json({ message: 'File uploaded successfully', filename: req.file.filename });
});



export default router;