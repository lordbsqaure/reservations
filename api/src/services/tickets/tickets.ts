import type {
  QueryResolvers,
  MutationResolvers,
  TicketRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const tickets: QueryResolvers['tickets'] = () => {
  return db.ticket.findMany()
}

export const ticket: QueryResolvers['ticket'] = ({ id }) => {
  return db.ticket.findUnique({
    where: { id },
  })
}

export const createTicket: MutationResolvers['createTicket'] = ({ input }) => {
  return db.ticket.create({
    data: input,
  })
}

export const updateTicket: MutationResolvers['updateTicket'] = ({
  id,
  input,
}) => {
  return db.ticket.update({
    data: input,
    where: { id },
  })
}

export const deleteTicket: MutationResolvers['deleteTicket'] = ({ id }) => {
  return db.ticket.delete({
    where: { id },
  })
}

export const Ticket: TicketRelationResolvers = {
  userTickets: (_obj, { root }) => {
    return db.ticket.findUnique({ where: { id: root?.id } }).userTickets()
  },
}
