// User.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Video } from './video.entity';
import { Comment } from './comment.entity';
import { Like } from './like.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @OneToMany(() => Video, (video:Video) => video.user) // One user has many videos
  videos: Video[];

  @OneToMany(() => Comment, (comment:Comment) => comment.user)
  comments: Comment[];
  
  @OneToMany(() => Like, (like: Like) => like.user)
  likes: Like[];
}
