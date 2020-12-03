import { Field, ObjectType, registerEnumType } from "type-graphql";
import {
  Column,
  Entity,
} from "typeorm";
import { Base } from "./Base"

export enum Role {
  ADMIN = "admin",
  MANAGER = "manager",
  PARTNER = "partner",
  CALLCENTER = "callcenter",
}

registerEnumType(Role, { name: 'Role' })

@ObjectType()
@Entity()
export class User extends Base {
  @Column({ nullable: true })
  coneUserId?: string;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Field()
  @Column({ nullable: true })
  name?: string;

  @Field(() => Role)
  @Column({ enum: Role })
  role!: Role;

  @Field()
  @Column({ nullable: true })
  workphone?: string;

  @Field()
  @Column({ nullable: true })
  banned: boolean;
}

