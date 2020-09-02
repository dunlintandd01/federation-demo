import { Module } from '@nestjs/common';
import { GraphQLFederationModule } from '@nestjs/graphql';
import { PostsResolvers } from './posts.resolvers';
import { PostsService } from './posts.service';
import { join } from 'path';
import { User } from './user.entity';

@Module({
  imports: [
    GraphQLFederationModule.forRoot({
      // typePaths: [join(process.cwd(), 'schema/post.graphql')],
      autoSchemaFile: join(process.cwd(), `schema/postCodeFirst.graphql`),
      buildSchemaOptions: {
        orphanedTypes: [User],
      },
      context: ({ req }) => {
        return {
          jwt: req.headers.authorization,
          requestId: req.requestId,
        };
      },
    }),
  ],
  providers: [PostsResolvers, PostsService],
})
export class AppModule {}
