import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { getConnection } from "typeorm";
import { Book } from "../entities/Book";
import { Author } from "../entities/Author";
import { AppContext } from "../types";

@InputType()
class BookInput {
  @Field()
  name: string;

  @Field()
  pageCount: number;

  @Field()
  authorId: number;
}

@Resolver(Book)
export class BookResolver {
  @FieldResolver(() => Author)
  author(@Root() book: Book, @Ctx() { authorLoader }: AppContext) {
    return authorLoader.load(book.authorId);
  }

  @Query(() => [Book])
  async books(
    @Arg("skip", () => Int, { nullable: true }) skip: number | null,
    @Arg("limit", () => Int, { nullable: true }) limit: number | null
  ): Promise<Book[]> {
    const query = getConnection()
      .getRepository(Book)
      .createQueryBuilder("book");
    if (skip && limit) {
      query.skip(skip).take(limit);
    } else if (limit) {
      query.take(limit);
    }
    return query.getMany();
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
