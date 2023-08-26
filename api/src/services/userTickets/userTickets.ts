import type {
  QueryResolvers,
  MutationResolvers,
  UserTicketRelationResolvers,
  UserTicket as newUserTicket,
} from 'types/graphql'

import { validate, validateWith, validateUniqueness } from '@redwoodjs/api'
import { UserInputError } from '@redwoodjs/graphql-server'

import { requireAuth } from 'src/lib/auth'
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
  console.log('hello')
  requireAuth()
  validate(input.quantity, 'quantity', {
    presence: true,
    exclusion: {
      in: [0],
      message: 'Quantity cannot be 0',
    },
    numericality: {
      integer: true,
    },
  })
  validate(input.ticketId, 'TicketId', {
    presence: true,
    exclusion: {
      in: [0],
      message: 'Quantity cannot be 0',
    },
    numericality: {
      integer: true,
    },
  })

  const query = `
   WITH "UserTicket" AS(INSERT INTO "UserTicket" ("ticketId","userId",quantity)
  SELECT ${input.ticketId}, ${context.currentUser.id}, ${input.quantity}
  WHERE (
    SELECT "limit" FROM "Ticket" WHERE id=${input.ticketId}
) >= ((SELECT COUNT(*) FROM "UserTicket" WHERE "ticketId"=${input.ticketId})+${input.quantity})

RETURNING *)SELECT * FROM "UserTicket"
 ;
    `

  const response: newUserTicket[] = await db.$queryRawUnsafe(query)
  if (response.length != 0) {
    const UserTicket = response[0]

    return UserTicket
  } else {
    throw new UserInputError('cannot insert data')
  }
}

export const updateUserTicket: MutationResolvers['updateUserTicket'] = ({
  id,
  input,
}) => {
  requireAuth()
  validate(input.quantity, 'quantity', {
    presence: true,
    exclusion: {
      in: [0],
      message: 'Quantity cannot be 0',
    },
    numericality: {
      integer: true,
    },
  })
  validate(input.ticketId, 'TicketId', {
    presence: true,
    exclusion: {
      in: [0],
      message: 'Ticket Id cannot be 0',
    },
    numericality: {
      integer: true,
    },
  })
  validate(id, 'id', {
    presence: true,
    exclusion: {
      in: [0],
      message: 'id  cannot be 0',
    },
    numericality: {
      integer: true,
    },
  })
  return db.userTicket.update({
    data: input,
    where: { id },
  })
}

export const deleteUserTicket: MutationResolvers['deleteUserTicket'] = ({
  id,
}) => {
  requireAuth()
  validate(input.quantity, 'quantity', {
    presence: true,
    exclusion: {
      in: [0],
      message: 'Quantity cannot be 0',
    },
    numericality: {
      integer: true,
    },
  })
  validate(input.ticketId, 'TicketId', {
    presence: true,
    exclusion: {
      in: [0],
      message: 'Ticket Id cannot be 0',
    },
    numericality: {
      integer: true,
    },
  })
  validate(id, 'id', {
    presence: true,
    exclusion: {
      in: [0],
      message: 'id  cannot be 0',
    },
    numericality: {
      integer: true,
    },
  })
  return db.userTicket.delete({
    where: { id },
  })
}

export const getUserTicket = async ({ id }) => {
  requireAuth()

  validate(id, 'id', {
    presence: true,
    exclusion: {
      in: [0],
      message: 'id  cannot be 0',
    },
    numericality: {
      integer: true,
    },
  })
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
