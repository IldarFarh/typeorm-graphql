import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Author } from "./Author";

@ObjectType()
@Entity()
export class Book extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  bookId: number;

  @Field()
  @Column({ unique: true })
  name: string;

  @Field()
  @Column()
  pageCount: number;

  @Field()
  @Column()
  authorId: number;

  @Field(() => Author)
  @ManyToOne(() => Author, (author) => author.books)
  author: Author;
}
