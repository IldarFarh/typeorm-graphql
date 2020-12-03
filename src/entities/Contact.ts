import { Field, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
} from "typeorm";
import { BaseCRMTags } from "./Base"

@ObjectType()
@Entity()
export class Contact extends BaseCRMTags {
  @Column({ nullable: true })
  companyId?: string;

  @Field()
  @Column({ nullable: true })
  call_source?: string;

  @Field()
  @Column({ nullable: true })
  city?: string;

  @Field()
  @Column({ nullable: true })
  post?: string;

  @Field(() => String)
  @Column({ type: 'timestamp', nullable: true })
  birthday?: Date;
}
