import { Field, ID, ObjectType } from "type-graphql";
import { ObjectIdColumn, ObjectID, CreateDateColumn, UpdateDateColumn, BaseEntity } from "typeorm";

@ObjectType()
export abstract class Base extends BaseEntity {
  @Field(() => ID)
  @ObjectIdColumn()
  id: ObjectID;

  @Field(() => String)
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}