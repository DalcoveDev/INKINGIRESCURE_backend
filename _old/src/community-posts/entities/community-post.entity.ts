import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { PostComment } from '../../post-comments/entities/post-comment.entity';
import { PostLike } from '../../post-likes/entities/post-like.entity';

@Entity('community_posts')
export class CommunityPost {
  @PrimaryColumn('varchar')
  id: string;

  @Column('varchar')
  user_id: string;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column('varchar')
  title: string;

  @Column('text')
  content: string;

  @Column('varchar', { nullable: true, array: true })
  media: string[];

  @Column('varchar')
  category: string;

  @Column('varchar', { nullable: true })
  district: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Relationships
  @OneToMany(() => PostComment, comment => comment.post)
  comments: PostComment[];

  @OneToMany(() => PostLike, like => like.post)
  likes: PostLike[];
}