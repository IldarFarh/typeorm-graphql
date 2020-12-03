import {
  Arg,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { Book } from "../entities/Book";
import { createResolver } from './base'

@InputType()
class BookInput {
  @Field()
  name: string;

  @Field()
  pageCount: number;

  @Field()
  authorId: string;
}

const BookBaseResolver = createResolver("Book", Book, Book, BookInput);

@Resolver(Book)
export class BookResolver extends BookBaseResolver {

  @Query(() => Book, { nullable: true })
  book(@Arg("id") id: number): Promise<Book | undefined> {
    return Book.findOne(id);
  }

  @Mutation(() => Book)
  createBook(@Arg("input") input: BookInput): Promise<Book> {
    return Book.create({ ...input }).save();
  }
}
