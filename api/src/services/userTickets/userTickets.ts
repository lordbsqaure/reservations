import type {
  QueryResolvers,
  MutationResolvers,
  UserTicketRelationResolvers,
  UserTicket,
} from 'types/graphql'

import { validate, validateWith, validateUniqueness } from '@redwoodjs/api'
import { UserInputError } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'

export const userTickets: QueryResolvers['userTickets'] = () => {
  return db.userTicket.findMany()
}

export const userTicket: QueryResolvers['userTicket'] = ({ id }) => {
  return db.userTicket.findUnique({
    where: { id },
  })
}

export const createUserTicket = async (input: UserTicket) => {
  validate(input.name, 'Name', {
    presence: true,
    exclusion: {
      in: ['Admin', 'Owner'],
      message: 'Sorry that name is reserved',
    },
    length: {
      min: 2,
      max: 255,
      message:
        'Please provide a name at least two characters long, but no more than 255',
    },
    format: {
      pattern: /^[A-Za-z]+$/,
      message: 'Name can only contain letters',
    },
  })
  const query = `
   WITH "UserTicket" AS(INSERT INTO "UserTicket" ("ticketId","userId",quantity)
  SELECT ${input.ticketId}, ${input.userId}, ${input.quantity}
  WHERE (
    SELECT "limit" FROM "Ticket" WHERE id=${input.ticketId}
) >= ((SELECT COUNT(*) FROM "UserTicket" WHERE "ticketId"=${input.ticketId})+${input.quantity})

RETURNING *)SELECT * FROM "UserTicket"
 ;
    `

  const response: UserTicket[] = await db.$queryRawUnsafe(query)
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
