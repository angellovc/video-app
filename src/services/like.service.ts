import { getRepository } from 'typeorm';
import { Like } from '../entities/like.entity';
import connectionSource from '@/datasource';
import { notFound, unauthorized } from '@hapi/boom';

const likeRepository = connectionSource.getRepository(Like);

export const createLike = async (userId: string, videoId: string): Promise<Like> => {
  const like = likeRepository.create({ userId, videoId });
  return likeRepository.save(like);
};

export const removeLike = async (userId: string, videoId: string): Promise<Like> => {
  const like = await likeRepository.findOne({
    where: {userId, videoId}
  });
  if (!like) throw notFound(`There's no like associate to that video`);
  if (like.id !== userId) throw unauthorized('You cannot unlike that video'); 
  return likeRepository.remove(like);
};
