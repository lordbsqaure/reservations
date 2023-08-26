export const schema = gql`
  type UserTicket {
    id: Int!
    User: User!
    userId: Int!
    Ticket: Ticket!
    ticketId: Int!
    quantity: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    userTickets: [UserTicket!]! @requireAuth
    userTicket(id: Int!): UserTicket @requireAuth
    getUserTicket(id: Int!): [UserTicket] @requireAuth
  }

  input CreateUserTicketInput {
    userId: Int!
    ticketId: Int!
    quantity: Int!
  }

  input UpdateUserTicketInput {
    userId: Int
    ticketId: Int
    quantity: Int
  }

  type Mutation {
    createUserTicket(input: CreateUserTicketInput!): UserTicket! @requireAuth
    updateUserTicket(id: Int!, input: UpdateUserTicketInput!): UserTicket!
      @requireAuth
    deleteUserTicket(id: Int!): UserTicket! @requireAuth
  }
`
