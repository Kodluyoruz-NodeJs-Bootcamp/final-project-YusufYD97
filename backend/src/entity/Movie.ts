import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

import { User } from './User';
import { Comment } from './Comment';
import { Like } from './Like';
import { Actor } from './Actor';

@Entity({ name: 'movies' })
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @IsNotEmpty()
  @Column()
  public name: string;

  @IsNotEmpty()
  @Column()
  public year: number;

  @Column({
      name: 'user_id',
      nullable: false,
  })
  @IsNotEmpty()
  public userId: string;

  @Column('boolean', { default: true })
  public isPrivate: boolean;

  @ManyToOne(type => User, user => user.movies, {
    eager: true,
  })
  @JoinColumn({ name: 'user_id' })
  public user: User;

  @OneToMany(type => Comment, comment => comment.movie)
  public comments: Comment[];

  @OneToMany(type => Like, like => like.movie)
  public likes: Like[];

  @OneToMany(type => Actor, actor => actor.movie)
  public actors: Actor[];

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  modifiedTime: Date;

  public toString(): string {
    return `${this.name}`;
  }
}