import { Field, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
} from "typeorm";
import { Author } from "./Author";
import {Base} from "./Base"

@ObjectType()
@Entity()
export class Book extends Base {
  @Field()
  @Column({ unique: true })
  name: string;

  @Field()
  @Column()
  pageCount: number;

  @Field()
  @Column()
  authorId: string;

  @Field(() => Author)
  @ManyToOne(() => Author, (author) => author.books)
  @JoinTable()
  author: Author;
}
