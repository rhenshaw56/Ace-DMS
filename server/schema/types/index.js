

const typeDefs = `
type User {
    id: ID!
    userName: String!
    email: String!
    password: String!
    token: String!
    roles: [String!]!
}
  type Query {
    allUsers: [User!]!
    getUser(userName: String!, id: String): User
  }
  type Mutation {
      createUser(
          userName: String!,
          authProvider: AuthProviderSignupData!
      ): User
      signInUser(
        authProvider: AuthProviderSignupData!
    ): User
  }
  input AuthProviderSignupData {
      email: String!
      password: String!
  }
`;

export default typeDefs;
