import {
  Field,
  InputType,
  Resolver,
} from "type-graphql";
import { Company } from "../entities/Company";
import { createResolver } from './base'

@InputType()
class CompanyInput {
  @Field()
  inn: string;

  @Field()
  responsibleId: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  email?: string;

  @Field(() => [String], { nullable: true })
  tags?: string[];

  @Field(() => [String], { nullable: true })
  phone?: string[];
}

const CompanyBaseResolver = createResolver("Company", Company, Company, CompanyInput, "tags");

@Resolver(Company)
export class CompanyResolver extends CompanyBaseResolver {
  // @Query(() => Book, { nullable: true })
  // book(@Arg("id") id: number): Promise<Book | undefined> {
  //   return Book.findOne(id);
  // }

  // @Mutation(() => Book)
  // createBook(@Arg("input") input: BookInput): Promise<Book> {
  //   return Book.create({ ...input }).save();
  // }
}
