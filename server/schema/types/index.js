// import userType from './user';

// const typeDefs = userType;

// export default typeDefs;

const typeDefs = `
type User {
    id: ID!
    userName: String!
    email: String!
    password: String!
}
  type Query {
    allUsers: [User!]!
  }
  type Mutation {
      createUser(
          userName: String!,
          authProvider: AuthProviderSignupData!
      ): User
  }
  input AuthProviderSignupData {
      email: String!
      password: String!
  }
`;

export default typeDefs;
