import { ApolloServer, gql } from 'apollo-server';
import { typeDefs, resolvers } from './schema';

const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  introspection: true
});

async function executeQuery(query: any, variables?: any) {
  return await server.executeOperation({
    query,
    variables
  });
}

test('getUser by ID returns correct user', async () => {
  const res = await executeQuery(gql`
    query {
      getUser(id: "1") {
        name
        email
      }
    }
  `);
  expect(res.data?.getUser.name).toBe("Alice");
});

test('listUsers with limit returns limited users', async () => {
  const res = await executeQuery(gql`
    query {
      listUsers(limit: 2) {
        id
      }
    }
  `);
  expect(res.data?.listUsers).toHaveLength(2);
});

test('getUser returns null for non-existent user', async () => {
  const res = await executeQuery(gql`
    query {
      getUser(id: "999") {
        id
        name
      }
    }
  `);
  expect(res.data?.getUser).toBeNull();
});

test('invalid query with non-existent field returns error', async () => {
  const res = await executeQuery(gql`
    query {
      getUser(id: "1") {
        id
        name
        invalidField
      }
    }
  `);
  expect(res.errors).toBeDefined();
  expect(res.errors?.[0].message).toContain('invalidField');
});

test('query resolves within 100ms', async () => {
  const start = Date.now();
  const res = await executeQuery(gql`
    query {
      listUsers {
        id
        name
        email
        age
      }
    }
  `);
  const duration = Date.now() - start;
  
  expect(res.data?.listUsers).toBeDefined();
  expect(duration).toBeLessThan(100);
});