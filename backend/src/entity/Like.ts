import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

import { User } from './User';
import { Movie } from './Movie';

@Entity({ name: 'likes' })
export class Like {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({
      name: 'user_id',
      nullable: false,
  })
  public userId: string;

  @Column({ name: 'movie_id', nullable: false })
  @IsNotEmpty()
  public movieId: string;

  @ManyToOne(type => User, user => user.movies)
  @JoinColumn({ name: 'user_id' })
  public user: User;

  @ManyToOne(type => Movie, movie => movie.likes)
  @JoinColumn({ name: 'movie_id' })
  public movie: Movie;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  modifiedTime: Date;

  public toString(): string {
    return `${this.movie}`;
  }
}