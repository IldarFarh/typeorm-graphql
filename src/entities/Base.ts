import { Field, ID, ObjectType } from "type-graphql";
import { ObjectIdColumn, ObjectID, CreateDateColumn, UpdateDateColumn, BaseEntity, Column } from "typeorm";

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

@ObjectType()
export abstract class BaseCRM extends Base {
  @Column()
  creatorId: string;

  @Column()
  responsibleId: string;

  @Field()
  @Column()
  groupId: string;
}

@ObjectType()
export abstract class BaseCRMTags extends BaseCRM {
  @Field()
  @Column()
  email: string;

  @Field()
  @Column({default: "Без наименования"})
  name: string;

  @Column()
  tags: string[];
}
