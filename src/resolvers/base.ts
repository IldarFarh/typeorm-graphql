import {
  Arg,
  Args,
  ArgsType,
  ClassType,
  Field,
  Int,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";

@ArgsType()
class GetPaginationArgs {
  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => Int, { nullable: true })
  take?: number;
}

export function createResolver<T extends ClassType, X extends ClassType>(suffix: string, returnType: T, entity: any, inputType: X) {
  const plSuffix = suffix + 's';
  @Resolver({ isAbstract: true })
  abstract class BaseResolver {

    @Query(() => returnType, { nullable: true, name: suffix })
    async getOne(@Arg("id") id: string): Promise<typeof returnType | undefined> {
      return entity.findOne(id);
    }

    @Query(() => [returnType], { name: `all${plSuffix}` })
    async getAll(@Args() pagination: GetPaginationArgs): Promise<typeof returnType[]> {
      return entity.find({ ...pagination });
    }

    @Query(() => Int, { name: `_all${plSuffix}Meta` })
    async countAll(): Promise<number> {
      return entity.count();
    }

    @Mutation(() => returnType, { name: `add${suffix}` })
    async addOne(@Arg("input", () => inputType) input: typeof inputType): Promise<typeof returnType> {
      return entity.create(input).save();
    }

    @Mutation(() => returnType, { name: `update${suffix}` })
    async updateOne(@Arg("id") id: string, @Arg("input", () => inputType) input: typeof inputType): Promise<typeof returnType> {
      const result = await entity.findOne(id);
      if (!result) throw new Error('Not found');
      for (const key in input) {
        result[key] = input[key]
      }
      return result.save();
    }

    @Mutation(() => Boolean, { name: `delete${suffix}` })
    async deleteOne(@Arg("id") id: string): Promise<Boolean> {
      await entity.delete(id);
      return true
    }

  }

  return BaseResolver;
}