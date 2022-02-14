import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

import { User } from './User';
import { Movie } from './Movie';

@Entity({ name: 'actors' })
export class Actor {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @IsNotEmpty()
  @Column({ nullable: false })
  public name: string;

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

  @ManyToOne(type => Movie, movie => movie.actors)
  @JoinColumn({ name: 'movie_id' })
  public movie: Movie;

  @Column('boolean', { default: true })
  public isPrivate: boolean;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  modifiedTime: Date;

  public toString(): string {
    return `${this.name}`;
  }
}