import { Field, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
} from "typeorm";
import {Base} from "./Base"

@ObjectType()
@Entity()
export class User extends Base {
  @Field()
  @Column({ unique: true, nullable: true })
  coneUserId?: string;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Field()
  @Column()
  name?: string;
}
