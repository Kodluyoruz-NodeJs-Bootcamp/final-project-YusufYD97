import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

import { User } from './User';
import { Movie } from './Movie';

@Entity({ name: 'comments' })
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @IsNotEmpty()
  @Column({ nullable: false })
  public text: string;

  @Column({
      name: 'user_id',
      nullable: false,
  })
  public userId: string;

  @Column({ name: 'movie_id', nullable: false })
  @IsNotEmpty()
  public movieId: string;

  @ManyToOne(type => User, user => user.movies, {
    eager: true,
  })
  @JoinColumn({ name: 'user_id' })
  public user: User;

  @ManyToOne(type => Movie, movie => movie.comments)
  @JoinColumn({ name: 'movie_id' })
  public movie: Movie;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  modifiedTime: Date;

  public toString(): string {
    return `${this.text}`;
  }
}