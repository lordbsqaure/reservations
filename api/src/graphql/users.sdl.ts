export const schema = gql`
  type User {
    id: Int!
    name: String
    email: String!
    resetToken: String
    role: Role!
    createdAt: DateTime!
    updatedAt: DateTime!
    resetTokenExpiresAt: DateTime
    userTickets: [UserTicket]!
  }

  enum Role {
    USER
    ADMIN
  }

  type Query {
    users: [User!]! @requireAuth(roles: ["admin"])
    user(id: Int!): User @requireAuth(roles: ["admin"])
  }

  input CreateUserInput {
    name: String
    email: String!
    password: String!
    role: Role!
  }

  input UpdateUserInput {
    name: String
    email: String
    password: String
    role: Role
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth(roles: ["admin"])
    updateUser(id: Int!, input: UpdateUserInput!): User!
      @requireAuth(roles: ["admin"])
    deleteUser(id: Int!): User! @requireAuth(roles: ["admin"])
  }
`
