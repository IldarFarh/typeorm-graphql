import { Field, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
} from "typeorm";
import { BaseCRMTags } from "./Base"

@ObjectType()
@Entity()
export class Company extends BaseCRMTags {
  @Field()
  @Column({ unique: true })
  inn: string;  

  @Column({ nullable: true })
  conePartnerId?: string;
}
