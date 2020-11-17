import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Author } from "../entities/Author";

@Resolver()
export class AuthorResolver {
  @Query(() => [Author])
  async authors(): Promise<Author[]> {
    return Author.find();
  }

  @Query(() => Author, { nullable: true })
  author(@Arg("id") id: number): Promise<Author | undefined> {
    return Author.findOne(id);
  }

  @Mutation(() => Author)
  createAuthor(@Arg("name") name: string): Promise<Author> {
    return Author.create({ name }).save();
  }
}
