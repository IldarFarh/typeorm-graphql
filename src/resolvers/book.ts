import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { Book } from "../entities/Book";
import { Author } from "../entities/Author";
import { AppContext } from "../types";
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
  @FieldResolver(() => Author)
  author(@Root() book: Book, @Ctx() { authorLoader }: AppContext) {
    return authorLoader.load(book.authorId);
  }

  @Query(() => Book, { nullable: true })
  book(@Arg("id") id: number): Promise<Book | undefined> {
    return Book.findOne(id);
  }

  @Mutation(() => Book)
  createBook(@Arg("input") input: BookInput): Promise<Book> {
    return Book.create({ ...input }).save();
  }
}
