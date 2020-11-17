import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Book } from "./Book";

@ObjectType()
@Entity()
export class Author extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  authorId: number;

  @Field()
  @Column({ unique: true })
  name: string;

  @OneToMany(() => Book, (book) => book.author)
  books: Book[];
}
