import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ObjectID,
  ObjectIdColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class Tag extends BaseEntity {
  @Field(() => ID)
  @ObjectIdColumn()
  id: ObjectID;

  @Field()
  @Column({ unique: true })
  name: string;
}
