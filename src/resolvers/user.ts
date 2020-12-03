import {
  Arg,
  Mutation,
  Query,
  Resolver,
  Field,
  InputType,
  Ctx
} from "type-graphql";
import argon2 from "argon2";
import { User, Role } from "../entities/User";
import { AppContext } from "../types"

@InputType()
class UserInput {
  @Field()
  email: string;

  @Field()
  name?: string;

  @Field()
  password: string;
}

@Resolver(User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: AppContext): Promise<User | null | undefined> {
    if (!req.session.userId) {
      return null
    }
    return User.findOne(req.session.userId)
  }

  @Query(() => [User])
  async allUsers(): Promise<User[]> {
    return User.find();
  }

  @Query(() => User, { nullable: true })
  User(@Arg("id") id: number): Promise<User | undefined> {
    return User.findOne(id);
  }

  @Mutation(() => User)
  async createUser(
    @Arg("input") input: UserInput,
    @Ctx() { req }: AppContext
  ): Promise<User> {
    const hashedPassword = await argon2.hash(input.password);
    const user = await User.create({ ...input, password: hashedPassword, role: Role.PARTNER, banned: false }).save()
    req.session.userId = user.id
    req.session.role = user.role
    return user
  }

  @Mutation(() => User)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { req }: AppContext
  ) {
    const user = await User.findOne({ where: { email } })
    if (!user) throw new Error('Указанный адрес электронной почты не найден!');
    const valid = await argon2.verify(user.password, password)
    if (!valid) throw new Error('Пароль не верный')
    req.session.userId = user.id
    req.session.role = user.role
    return user
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: AppContext) {
    return new Promise(resolve => req.session.destroy((err: Error) => {
      res.clearCookie('qid');
      if (err) {
        console.log(err);
        resolve(false);
        return;
      }
      resolve(true);
    }))
  }
}
