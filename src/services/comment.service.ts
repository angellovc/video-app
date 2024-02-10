// comment.service.ts
import { Comment } from '@/entities/comment.entity';
import connectionSource from '@/datasource';
import { getUserById } from './user.service';
import { getVideoById } from './video.service';

const commentRepository = connectionSource.getRepository(Comment);

export const createComment = async ({text, userId, videoId}:{text: string, userId: string, videoId: string}): Promise<Comment> => {
  const user = await getUserById(userId);
  const video = await getVideoById(videoId);
  const comment = new Comment();
  comment.text = text;
  comment.video = video;
  comment.user = user;
  return commentRepository.save(comment);
};

export const getCommentsByVideoId = async (videoId: string): Promise<Comment[]> => {
  return commentRepository.find({ where: { videoId } });
};

export const getComments = async (videoId:string) => {
  const video = await getVideoById(videoId);
  console.log(video);
  return commentRepository.find({ where: {videoId: video.id} });
}

// export const updateComment = async (id: string, text: string): Promise<Comment | null> => {
//   const commentRepository = getRepository(Comment);
//   const comment = await commentRepository.findOne(id);
//   if (!comment) return null;
//   comment.text = text;
//   return await commentRepository.save(comment);
// };

// export const deleteComment = async (id: string): Promise<boolean> => {
//   const commentRepository = getRepository(Comment);
//   const comment = await commentRepository.findOne(id);
//   if (!comment) return false;
//   await commentRepository.remove(comment);
//   return true;
// };
