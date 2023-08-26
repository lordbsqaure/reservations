import type {
  QueryResolvers,
  MutationResolvers,
  TicketRelationResolvers,
} from 'types/graphql'

import { validate } from '@redwoodjs/api'

import { requireAuth } from 'src/lib/auth'
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
  requireAuth({ roles: ['admin'] })

  validate(input.TicketType, 'type', {
    presence: true,
    inclusion: {
      in: ['BASIC', 'STANDARD', 'PREMIUM'],
      message: 'type must be a known type',
    },
  })
  validate(input.limit, 'limit', {
    presence: true,
    numericality: {
      integer: true,
      greaterThanOrEqual: 0,
      message: 'Please input a positive number',
    },
  })
  validate(input.name, 'name', {
    presence: true,
    exclusion: {
      in: ['admin', 'user'],
      message: 'type must be a known type',
    },
    length: {
      min: 2,
    },
  })

  return db.ticket.create({
    data: input,
  })
}

export const updateTicket: MutationResolvers['updateTicket'] = ({
  id,
  input,
}) => {
  requireAuth({ roles: ['admin'] })

  validate(input.TicketType, 'type', {
    presence: true,
    inclusion: {
      in: ['BASIC', 'STANDARD', 'PREMIUM'],
      message: 'type must be a known type',
    },
  })
  validate(input.limit, 'limit', {
    presence: true,
    numericality: {
      integer: true,
      greaterThanOrEqual: 0,
      message: 'Please input a positive number',
    },
  })

  validate(input.name, 'name', {
    presence: true,
    exclusion: {
      in: ['admin', 'user'],
      message: 'type must be a known type',
    },
    length: {
      min: 2,
    },
  })

  return db.ticket.update({
    data: input,
    where: { id },
  })
}

export const deleteTicket: MutationResolvers['deleteTicket'] = ({ id }) => {
  requireAuth({ roles: ['admin'] })
  return db.ticket.delete({
    where: { id },
  })
}

export const Ticket: TicketRelationResolvers = {
  userTickets: (_obj, { root }) => {
    return db.ticket.findUnique({ where: { id: root?.id } }).userTickets()
  },
}
