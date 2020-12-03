import {
  Field,
  InputType,
  Resolver,
} from "type-graphql";
import { Contact } from "../entities/Contact";
import { createResolver } from './base'

@InputType()
class ContactInput {
  @Field()
  responsibleId: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  companyId?: string;
  
  @Field({ nullable: true })
  call_source?: string;
  
  @Field({ nullable: true })
  city?: string;
  
  @Field({ nullable: true })
  post?: string;

  @Field({ nullable: true })
  birthday?: string;

  @Field({ nullable: true })
  email?: string;

  @Field(() => [String], { nullable: true })
  tags?: string[];

  @Field(() => [String], { nullable: true })
  phone?: string[];
}

const ContactBaseResolver = createResolver("Contact", Contact, Contact, ContactInput, "tags");

@Resolver(Contact)
export class ContactResolver extends ContactBaseResolver {}
