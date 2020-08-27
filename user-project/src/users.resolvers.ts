import { Args, Query, Resolver, ResolveReference } from '@nestjs/graphql';
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
  resolveReference(reference: { __typename: string; id: string }) {
    return this.usersService.findById(reference.id);
  }
}
