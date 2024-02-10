import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Video } from './video.entity';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  text: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'video_id' })
  videoId: string;

  @ManyToOne(() => User, user => user.comments)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Video, video => video.comments)
  @JoinColumn({ name: 'video_id' })
  video: Video;
}
