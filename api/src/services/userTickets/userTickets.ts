import type {
  QueryResolvers,
  MutationResolvers,
  UserTicketRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const userTickets: QueryResolvers['userTickets'] = () => {
  return db.userTicket.findMany()
}

export const userTicket: QueryResolvers['userTicket'] = ({ id }) => {
  return db.userTicket.findUnique({
    where: { id },
  })
}

export const createUserTicket: MutationResolvers['createUserTicket'] = async ({
  input,
}) => {
  // const query = `
  //     INSERT INTO userTicket(userId, ticketId, quantity) VALUES (${input.userId},${input.ticketId},${input.quantity})
  //     SELECT userId,ticketId,id
  //     FROM ticket
  //     CROSS JOIN userTicket
  //     WHERE (
  //       SELECT COUNT(CASE WHEN ticketId=${input.ticketId}) FROM userTicket
  //     ) < ticket.limit RETURNING "id";
  //   `
  // const test = `WITH inserted_row AS (INSERT INTO "UserTicket"("userId", "ticketId", quantity)  VALUES (${input.userId},${input.ticketId},${input.quantity}) RETURNING "id")
  //   SELECT "id" FROM inserted_row;`

  const count = await db.userTicket.count({
    where: {
      ticketId: input.ticketId,
    },
  })
  const limit = await db.ticket.findFirst({
    where: {
      id: input.ticketId,
    },
  })
  if (count + input.quantity <= limit.limit) {
    const response = await db.userTicket.create({ data: { ...input } })
    return response
  } else {
    throw Error('quantity not available')
  }
}

export const updateUserTicket: MutationResolvers['updateUserTicket'] = ({
  id,
  input,
}) => {
  return db.userTicket.update({
    data: input,
    where: { id },
  })
}

export const deleteUserTicket: MutationResolvers['deleteUserTicket'] = ({
  id,
}) => {
  return db.userTicket.delete({
    where: { id },
  })
}

export const getUserTicket = async ({ id }) => {
  const response = await db.userTicket.findMany({
    where: { userId: id },
    include: {
      Ticket: true,
    },
  })
  return response
}

export const UserTicket: UserTicketRelationResolvers = {
  User: (_obj, { root }) => {
    return db.userTicket.findUnique({ where: { id: root?.id } }).User()
  },
  Ticket: (_obj, { root }) => {
    return db.userTicket.findUnique({ where: { id: root?.id } }).Ticket()
  },
}
