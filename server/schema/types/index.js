// import userType from './user';

// const typeDefs = userType;

// export default typeDefs;

const typeDefs = `
  type Link {
    id: ID!
    url: String!
    description: String!
  }
type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    roleId: Int!
    createdAt: String
    token: String!
}
  type Query {
    allLinks: [Link!]!
    allUsers: [User!]!
  }
  type Mutation {
      createUser(
          firstName: String!,
          lastName: String!,
          authProvider: AuthProviderSignupData!
      ): User
  }
  input AuthProviderSignupData {
      email: String!
      password: String!
  }
`;

export default typeDefs;
