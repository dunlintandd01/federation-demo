import {
  Args,
  Query,
  Resolver,
  ResolveReference,
  Context,
} from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './user.entity';

// @Resolver('User')
@Resolver(() => User)
export class UsersResolvers {
  constructor(private usersService: UsersService) {}

  // @Query()
  @Query(returns => User)
  getUser(@Args('id') id: string) {
    return this.usersService.findById(id);
  }

  @ResolveReference()
  // NOTE: how to get context, reference: https://github.com/nestjs/graphql/issues/945
  resolveReference(reference: { __typename: string; id: string }, ctx) {
    console.log(
      '===================== user resolveReference',
      ctx.req.headers['request-id'],
    );
    return this.usersService.findById(reference.id);
  }
}
