// const userType = `{
//     type User {
//         id: ID!
//         firstName: String!
//         lastName: String!
//         email: String!
//         password: String!
//         roleId: Int!
//         currentToken: String!
//     }
//     type Query {
//         allUsers: [User!]!
//     }
//     type Mutation {
//         createUser(
//             firstName: String!,
//             lastName: String!,
//             email: String!,
//             password: String!
//         ): User!
//         deleteUser(
//             id: ID!
//         ): User!
//         loginUser(
//             email: String!
//             password: String!
//         ): User!
//         logoutUser(
//             id: ID!
//         )
//         updateUser(
//             id: ID!
//             firstName: String!
//             lastName: String!
//             email: String!
//             password: String!        
//         )
//     }
// }`;

const typeDef = `{
    type Query { 
        allLinks: String
    }
}`;

export default typeDef;


