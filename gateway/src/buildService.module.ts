import { Module } from '@nestjs/common';
import { RemoteGraphQLDataSource } from '@apollo/gateway';
import { GATEWAY_BUILD_SERVICE } from '@nestjs/graphql';
import { decode } from 'jsonwebtoken';

class AuthenticatedDataSource extends RemoteGraphQLDataSource {
  async willSendRequest({ request, context }) {
    if (context.jwt) {
      const { userId } = await decode(context.jwt);
      request.http.headers.set('x-user-id', userId);
    }
  }
}

@Module({
  providers: [
    {
      provide: AuthenticatedDataSource,
      useValue: AuthenticatedDataSource,
    },
    {
      provide: GATEWAY_BUILD_SERVICE,
      useFactory: AuthenticatedDataSource => {
        return ({ name, url }) => new AuthenticatedDataSource({ url });
      },
      inject: [AuthenticatedDataSource],
    },
  ],
  exports: [GATEWAY_BUILD_SERVICE],
})
export class BuildServiceModule {}
