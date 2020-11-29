import { Field, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  OneToMany,
} from "typeorm";
import { Book } from "./Book";
import {Base} from "./Base"

@ObjectType()
@Entity()
export class Author extends Base {
  @Field()
  @Column({ unique: true })
  name: string;

  @OneToMany(() => Book, (book) => book.author)
  books: Book[];
}
