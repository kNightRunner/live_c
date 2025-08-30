import 'dotenv/config';
import { ApolloServer } from 'apollo-server';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { typeDefs, resolvers } from './schema';

const isProd = process.env.NODE_ENV === 'production';
const enableSandbox = process.env.ENABLE_SANDBOX === 'true';

// Allow multiple origins, comma-separated in .env
const allowedOrigins = (process.env.CORS_ORIGIN || 'https://studio.apollographql.com,*.github.dev')
  .split(',')
  .map(origin => origin.trim());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  ...(isProd ? { persistedQueries: false } : { cache: 'bounded' }),
  introspection: enableSandbox || !isProd,
  plugins: enableSandbox ? [ApolloServerPluginLandingPageLocalDefault({ embed: true })] : [],
  cors: { origin: allowedOrigins },
});

const port = process.env.PORT || 4000;

server.listen({ port }).then(({ url }) => {
  console.log(`Server ready at ${url} (env: ${process.env.NODE_ENV || 'development'})`);
});
