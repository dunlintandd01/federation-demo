import { Module, MiddlewareConsumer } from '@nestjs/common';
import { GraphQLGatewayModule, GATEWAY_BUILD_SERVICE } from '@nestjs/graphql';

import { BuildServiceModule } from './buildService.module';
import { RequestMiddleware } from './request.interceptor';
const gatewayConfig = {
  debug: true,
  serviceList: [
    { name: 'users', url: 'http://localhost:5001/graphql' },
    { name: 'posts', url: 'http://localhost:5002/graphql' },
  ],
  serviceHealthCheck: true,
  // NOTE: https://github.com/apollographql/apollo-server/pull/3110
  // experimental_pollInterval: 10000, // add polling to any service definition lookup
  experimental_didUpdateComposition: () => {
    console.log('Composition updated');
  },
};

@Module({
  imports: [
    GraphQLGatewayModule.forRootAsync({
      useFactory: async () => ({
        server: {
          // ... Apollo server options
          cors: true,
          context: ({ req }) => ({
            jwt: req.headers.authorization,
            requestId: req.requestId,
          }),
          onHealthCheck: async () => {
            // NOTE: /.well-known/apollo/server-health
            console.log('============ server onHealthCheck');
          },
        },
        gateway: gatewayConfig,
      }),
      imports: [BuildServiceModule],
      inject: [GATEWAY_BUILD_SERVICE],
    }),
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RequestMiddleware).forRoutes('*');
  }
}
