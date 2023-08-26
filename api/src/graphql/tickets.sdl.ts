export const schema = gql`
  type Ticket {
    id: Int!
    name: String!
    TicketType: TicketType!
    userTickets: [UserTicket]!
    createdAt: DateTime!
    updatedAt: DateTime!
    limit: Int!
  }

  enum TicketType {
    BASIC
    STANDART
    PREMIUM
  }

  type Query {
    tickets: [Ticket!]! @requireAuth
    ticket(id: Int!): Ticket @requireAuth
  }

  input CreateTicketInput {
    name: String!
    TicketType: TicketType!
    limit: Int!
  }

  input UpdateTicketInput {
    name: String
    TicketType: TicketType
    limit: Int
  }

  type Mutation {
    createTicket(input: CreateTicketInput!): Ticket!
      @requireAuth(roles: ["admin"])
    updateTicket(id: Int!, input: UpdateTicketInput!): Ticket!
      @requireAuth(roles: ["admin"])
    deleteTicket(id: Int!): Ticket! @requireAuth(roles: ["admin"])
  }
`
