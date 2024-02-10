import connectionSource from '@/datasource';
import { Video } from '@/entities/video.entity';
import { notFound, unauthorized } from '@hapi/boom';
import * as fs from 'fs';

const videoRepository = connectionSource.getRepository(Video);

export const createVideo = async (videoData: Partial<Video>): Promise<Video> => {
  const video = videoRepository.create(videoData);
  return await videoRepository.save(video);
}

export const getVideos = async () => {
  return videoRepository.find({
    relations: ['comments', 'user', 'likes']
  })
}

export const getVideoById = async (id:string) => {
  const video = await videoRepository.findOne({
    where: {id}
  });
  if (!video) throw notFound(`There's no video with id ${id}`);
  return video;
}

export const updateVideo = async (videoId: string, userId: string, updates: Partial<Video>): Promise<Video | null> => {
  const video = await getVideoById(videoId);
  if (video.userId !== userId) throw unauthorized(`You can't edit that video`);
  Object.assign(video, updates);
  return await videoRepository.save(video);
}

export const deleteVideo = async (videoId: string, userId: string): Promise<Video> => {
  const video = await getVideoById(videoId);
  if (video.userId !== userId) throw unauthorized(`You cannot delete this resource`);
  
  fs.unlinkSync(`videos/${video.filename}`);
  return videoRepository.remove(video);
}
