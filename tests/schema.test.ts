import { ApolloServer, gql } from 'apollo-server';
import { typeDefs, resolvers } from '../src/schema';

let server: ApolloServer;

beforeAll(() => {
  server = new ApolloServer({ typeDefs, resolvers });
});

afterAll(async () => {
  await server.stop();
});

describe('GraphQL API Challenge', () => {
  it('returns user by id', async () => {
    const res = await server.executeOperation({
      query: gql`
        query ($id: ID!) {
          getUser(id: $id) {
            id
            name
            email
            age
          }
        }
      `,
      variables: { id: '1' },
    });

    expect(res.errors).toBeUndefined();
    expect(res.data?.getUser).toMatchObject({
      id: '1',
      name: 'Alice',
      email: 'alice@mail.com',
      age: 30,
    });
  });

  it('lists users with limit', async () => {
    const res = await server.executeOperation({
      query: gql`
        query ($limit: Int) {
          listUsers(limit: $limit) {
            id
            name
          }
        }
      `,
      variables: { limit: 2 },
    });

    expect(res.errors).toBeUndefined();
    expect(res.data?.listUsers).toHaveLength(2);
  });

  it('returns null when user does not exist', async () => {
    const res = await server.executeOperation({
      query: gql`
        query {
          getUser(id: "999") {
            id
          }
        }
      `,
    });

    expect(res.errors).toBeUndefined();
    expect(res.data?.getUser).toBeNull();
  });

  it('resolves listUsers within 100ms', async () => {
    // warm-up
    await server.executeOperation({ query: gql`query { listUsers { id } }` });

    const start = Number(process.hrtime.bigint()); // ns
    const res = await server.executeOperation({
      query: gql`query { listUsers { id name } }`,
    });
    const end = Number(process.hrtime.bigint());
    const elapsedMs = (end - start) / 1_000_000; // ns → ms

    expect(res.errors).toBeUndefined();
    expect(elapsedMs).toBeLessThan(100);
  });

  it('errors when querying a non-existent field', async () => {
    const res = await server.executeOperation({
      // Campo "foo" no existe en Query
      query: gql`query { foo }`,
    });

    expect(res.errors).toBeDefined();
    expect(res.errors![0].message).toMatch(/Cannot query field "foo" on type "Query"/);
    expect(res.data).toBeUndefined();
  });
});
