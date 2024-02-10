import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";
import { Comment } from "./comment.entity";
import { Like } from "./like.entity";

@Entity('videos')
export class Video {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({unique: true, nullable: false})
  filename: string;

  @Column({nullable: false})
  title: string;

  @Column({nullable: true})
  description: string;

  @Column({nullable: true})
  credits: string;

  @Column({default: 'true', name: 'is_public'})
  isPublic: boolean;

  @Column({ type: 'date', nullable: true})
  publicationDate: Date;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({name: 'user_id'})
  userId: string

  @ManyToOne(() => User, (user:User) => user.videos, {nullable: false})
  @JoinColumn({name: 'user_id'})
  user: User;

  @OneToMany(() => Comment, (comment:Comment) => comment.video)
  comments: Comment[];

  @OneToMany(() => Like, (like: Like) => like.video)
  likes: Like[];
}