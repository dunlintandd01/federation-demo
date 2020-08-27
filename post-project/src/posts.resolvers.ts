import { Args, Query, Resolver, Parent, ResolveField } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post as IPost } from './posts.interfaces';
import { Post } from './post.entity';
import { User } from './user.entity';

// @Resolver('Post')
@Resolver(() => Post)
export class PostsResolvers {
  constructor(private postsService: PostsService) {}

  @Query(returns => [Post])
  getPosts() {
    return this.postsService.findAll();
  }

  @Query(returns => [Post])
  getPostsByUser(@Args('userId') userId: string) {
    return this.postsService.findByUserId(userId);
  }

  @Query(returns => Post)
  getPost(@Args('postId') postId: string) {
    return this.postsService.findOne(postId);
  }

  // @ResolveProperty('user')
  @ResolveField('user', () => User)
  getUser(@Parent() post: IPost) {
    return { __typename: 'User', id: post.userId };
  }
}
