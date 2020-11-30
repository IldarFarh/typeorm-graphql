import {
  Resolver,
  InputType,
  Field,
} from "type-graphql";
import { Tag } from "../entities/Tag";
import { createResolver } from './base'

@InputType()
class TagInput {
  @Field()
  name: string;
}

const TagBaseResolver = createResolver("Tag", Tag, Tag, TagInput);

@Resolver(Tag)
export class TagResolver extends TagBaseResolver { }
