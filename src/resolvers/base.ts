import {
  Arg,
  Args,
  ArgsType,
  ClassType,
  Ctx,
  Field,
  FieldResolver,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { isAdmin, isAuth } from '../middleware/isAuth'
import { User } from "../entities/User";
import { Tag } from "../entities/Tag";
import { AppContext } from "../types";
@ArgsType()
class GetPaginationArgs {
  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => Int, { nullable: true })
  take?: number;
}

export function createResolver<T extends ClassType, X extends ClassType>(suffix: string, returnType: T, entity: any, inputType: X, extended: "default" | "creator" | "tags" = 'default') {
  const plSuffix = suffix.endsWith('y') ? suffix.replace('y', 'ies') : suffix + 's';
  @Resolver({ isAbstract: true })
  abstract class BaseResolver {
    @Query(() => returnType, { nullable: true, name: suffix })
    @UseMiddleware(isAuth)
    async getOne(@Arg("id") id: string): Promise<typeof returnType | undefined> {
      return entity.findOne(id);
    }

    @Query(() => [returnType], { name: `all${plSuffix}` })
    @UseMiddleware(isAuth)
    async getAll(@Args() pagination: GetPaginationArgs, @Arg("filter", () => inputType, { nullable: true }) filter: typeof inputType): Promise<typeof returnType[]> {
      return entity.find({ ...pagination, where: { ...filter } });
    }

    @Query(() => Int, { name: `_all${plSuffix}Meta` })
    @UseMiddleware(isAuth)
    async countAll(@Arg("filter", () => inputType, { nullable: true }) filter: typeof inputType): Promise<number> {
      return entity.count({ where: { ...filter } });
    }

    @Mutation(() => returnType, { name: `add${suffix}` })
    @UseMiddleware(isAuth)
    async addOne(@Arg("input", () => inputType) input: typeof inputType): Promise<typeof returnType> {
      return entity.create(input).save();
    }

    @Mutation(() => returnType, { name: `update${suffix}` })
    @UseMiddleware(isAuth)
    async updateOne(@Arg("id") id: string, @Arg("input", () => inputType) input: typeof inputType): Promise<typeof returnType> {
      const result = await entity.findOne(id);
      if (!result) throw new Error('Not found');
      for (const key in input) {
        result[key] = input[key]
      }
      return result.save();
    }

    @Mutation(() => Boolean, { name: `delete${plSuffix}` })
    @UseMiddleware(isAdmin)
    async deleteMany(@Arg("ids", () => [String]) ids: string[]): Promise<Boolean> {
      await entity.delete(ids);
      return true
    }
  }
  if (extended === "default") return BaseResolver;

  @Resolver(entity, { isAbstract: true })
  abstract class CreatorResolver extends BaseResolver {
    @FieldResolver(() => User)
    creator(@Root() entity: any, @Ctx() { userLoader }: AppContext) {
      return userLoader.load(entity.creatorId);
    }

    @FieldResolver(() => User)
    responsible(@Root() entity: any, @Ctx() { userLoader }: AppContext) {
      return userLoader.load(entity.responsibleId);
    }
  }
  if (extended === "creator") return CreatorResolver;

  @Resolver(entity, { isAbstract: true })
  abstract class TagsResolver extends CreatorResolver {
    @FieldResolver(() => [Tag])
    tags(@Root() entity: any, @Ctx() { tagLoader }: AppContext) {
      return tagLoader.loadMany(entity.tags);
    }
  }
  return TagsResolver;
}
