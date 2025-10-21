import { Entity, Column, PrimaryColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { CommunityPost } from '../../community-posts/entities/community-post.entity';
import { User } from '../../users/entities/user.entity';

@Entity('post_comments')
export class PostComment {
  @PrimaryColumn('varchar')
  id: string;

  @Column('varchar')
  post_id: string;

  @ManyToOne(() => CommunityPost, { eager: true })
  @JoinColumn({ name: 'post_id' })
  post: CommunityPost;

  @Column('varchar')
  user_id: string;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column('text')
  comment: string;

  @CreateDateColumn()
  created_at: Date;
}