import type {
  QueryResolvers,
  MutationResolvers,
  UserRelationResolvers,
} from 'types/graphql'

import { validate } from '@redwoodjs/api'

import { requireAuth } from 'src/lib/auth'
import { db } from 'src/lib/db'

export const users: QueryResolvers['users'] = () => {
  return db.user.findMany()
}

export const user: QueryResolvers['user'] = ({ id }) => {
  return db.user.findUnique({
    where: { id },
  })
}

export const createUser: MutationResolvers['createUser'] = ({ input }) => {
  requireAuth({ roles: ['admin'] })

  validate(input.name, 'type', {
    exclusion: {
      in: ['admin', 'user'],
      message: 'Please name should not be admin or user',
    },
  })
  validate(input.email, 'limit', {
    presence: true,
    email: {
      message: 'please input a valid email',
    },
  })
  validate(input.hashedPassword, 'password', {
    presence: true,
    length: {
      min: 4,
    },
  })
  validate(input.role, 'name', {
    presence: true,
    exclusion: {
      in: ['admin'],
      message: 'Role must not be admin',
    },
    length: {
      min: 4,
    },
  })
  return db.user.create({
    data: input,
  })
}

export const updateUser: MutationResolvers['updateUser'] = ({ id, input }) => {
  requireAuth({ roles: ['admin'] })

  validate(input.name, 'type', {
    exclusion: {
      in: ['admin', 'user'],
      message: 'Please name should not be admin or user',
    },
  })
  validate(input.email, 'limit', {
    presence: true,
    email: {
      message: 'please input a valid email',
    },
  })
  validate(input.hashedPassword, 'password', {
    presence: true,
    length: {
      min: 4,
    },
  })
  validate(id, 'id', {
    presence: true,
    exclusion: {
      in: [0],
      message: 'id should not be 0',
    },
  })
  validate(input.role, 'name', {
    presence: true,
    exclusion: {
      in: ['admin'],
      message: 'Role must not be admin',
    },
    length: {
      min: 4,
    },
  })
  return db.user.update({
    data: input,
    where: { id },
  })
}

export const deleteUser: MutationResolvers['deleteUser'] = ({ id }) => {
  return db.user.delete({
    where: { id },
  })
}

export const User: UserRelationResolvers = {
  userTickets: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).userTickets()
  },
}
