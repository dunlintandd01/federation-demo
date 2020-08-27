import { ObjectType, Directive, Field, ID } from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields: "id")')
export class Post {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  body: string;

  @Field(type => String)
  userId: string;

  constructor(post: Partial<Post>) {
    Object.assign(this, post);
  }
}
