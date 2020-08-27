import { Module } from '@nestjs/common';
import { GraphQLFederationModule } from '@nestjs/graphql';
import { UsersResolvers } from './users.resolvers';
import { UsersService } from './users.service';
import { join } from 'path';

@Module({
  imports: [
    GraphQLFederationModule.forRoot({
      // typePaths: [join(process.cwd(), 'schema/user.graphql')],
      autoSchemaFile: join(process.cwd(), `schema/userCodeFirst.graphql`),
    }),
  ],
  providers: [UsersResolvers, UsersService],
})
export class AppModule {}
