import { formatError } from '@bit/eddeee888.learnd-utils.graphql';
import cookieParser = require('cookie-parser');
import { GraphQLServer } from 'graphql-yoga';

import tokenChecker from 'src/middleware/tokenChecker';
import { prisma } from 'src/web/graphql/generated/prisma-client';
import { resolvers } from 'src/web/graphql/resolvers';

const PORT = process.env.PORT || 8000;

const server = new GraphQLServer({
  typeDefs: './schemas/schema.graphql',
  resolvers: resolvers as any, // https://github.com/prisma/graphql-yoga/issues/379
  context: contextParams => ({
    ...contextParams,
    prisma
  })
});

server.express.use(cookieParser());
server.express.use(tokenChecker);

server.start(
  {
    port: PORT,
    endpoint: '/graphql',
    subscriptions: '/graphql',
    playground: '/graphql/interactive',
    formatError,
    cors: { origin: process.env.SERVER_NAME, credentials: true }
  },
  () =>
    // tslint:disable-next-line
    console.log(`Server is running on http://localhost:${PORT}`)
);
