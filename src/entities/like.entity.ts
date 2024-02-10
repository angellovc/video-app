import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { User } from './user.entity';
import { Video } from './video.entity';

@Entity('likes')
export class Like {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({name: 'user_id'})
  userId: string;

  @Column({name: 'video_id'})
  videoId: string;

  @ManyToOne(() => User, (user: User) => user.likes)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Video, (video: Video) => video.likes)
  @JoinColumn({ name: 'video_id' })
  video: Video;
}
