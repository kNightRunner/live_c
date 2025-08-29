import { gql } from 'apollo-server';

export const users = [
  { id: '1', name: 'Alice', email: 'alice@mail.com', age: 30 },
  { id: '2', name: 'Bob', email: 'bob@mail.com', age: 25 },
  { id: '3', name: 'Charlie', email: 'charlie@mail.com', age: 35 }
];

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }

  type Query {
    getUser(id: ID!): User
    listUsers(limit: Int): [User!]!
  }
`;

export const resolvers = {
  Query: {
    getUser: (_: any, { id }: { id: string }) =>
      users.find(user => user.id === id) || null,

    listUsers: (_: any, { limit }: { limit?: number }) =>
      limit ? users.slice(0, limit) : users
  }
};