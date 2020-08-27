import { Module } from '@nestjs/common';
import { GraphQLGatewayModule, GATEWAY_BUILD_SERVICE } from '@nestjs/graphql';

import { BuildServiceModule } from './buildService.module';

@Module({
  imports: [
    GraphQLGatewayModule.forRootAsync({
      useFactory: async () => ({
        server: {
          // ... Apollo server options
          cors: true,
          context: ({ req }) => ({
            jwt: req.headers.authorization,
          }),
        },
        gateway: {
          serviceList: [
            { name: 'users', url: 'http://localhost:5001/graphql' },
            { name: 'posts', url: 'http://localhost:5002/graphql' },
          ],
        },
      }),
      imports: [BuildServiceModule],
      inject: [GATEWAY_BUILD_SERVICE],
    }),
  ],
})
export class AppModule {}
