import { ObjectType, Directive, Field, ID } from '@nestjs/graphql';

@ObjectType()
@Directive(`@key(fields: "id")`)
export class User {
  @Field(type => ID)
  id: string;

  @Field()
  name: string;
}
