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
    console.log('======================= context.requestId', context.requestId);
    request.http.headers.set('request-id', context.requestId);
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
      // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
      useFactory: AuthenticatedDataSource => {
        // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
        return ({ url }) => new AuthenticatedDataSource({ url });
      },
      inject: [AuthenticatedDataSource],
    },
  ],
  exports: [GATEWAY_BUILD_SERVICE],
})
export class BuildServiceModule {}
