import * as bcrypt from 'bcrypt';
import { IsNotEmpty } from 'class-validator';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Movie } from './Movie';
import { Comment } from './Comment';

@Entity({ name: 'users' })
export class User {
  public static hashPassword(password: string): string {
      const hashed = bcrypt.hashSync(password, 10);
      return hashed;
  }

  public static comparePassword(user: User, password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        resolve(res === true);
      });
    });
  }

  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @IsNotEmpty()
  @Column({ name: 'first_name' })
  public firstName: string;

  @IsNotEmpty()
  @Column({ name: 'last_name' })
  public lastName: string;

  @IsNotEmpty()
  @Column({ unique: true })
  public email: string;

  @IsNotEmpty()
  @Column()
  public password: string;

  @OneToMany(type => Movie, movie => movie.user)
  public movies: Movie[];

  @OneToMany(type => Comment, comment => comment.user)
  public comments: Comment[];

  @CreateDateColumn()
  public dateCreated: Date;

  @UpdateDateColumn()
  public dateModified: Date;

  public toString(): string {
    return `${this.firstName} ${this.lastName} (${this.email})`;
  }

  @BeforeInsert()
  public async hashPassword(): Promise<void> {
    this.password = await User.hashPassword(this.password);
  }

}