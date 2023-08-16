import type { UserTicket } from '@prisma/client'

import {
  userTickets,
  userTicket,
  createUserTicket,
  updateUserTicket,
  deleteUserTicket,
} from './userTickets'
import type { StandardScenario } from './userTickets.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('userTickets', () => {
  scenario('returns all userTickets', async (scenario: StandardScenario) => {
    const result = await userTickets()

    expect(result.length).toEqual(Object.keys(scenario.userTicket).length)
  })

  scenario(
    'returns a single userTicket',
    async (scenario: StandardScenario) => {
      const result = await userTicket({ id: scenario.userTicket.one.id })

      expect(result).toEqual(scenario.userTicket.one)
    }
  )

  scenario('creates a userTicket', async (scenario: StandardScenario) => {
    const result = await createUserTicket({
      input: {
        userId: scenario.userTicket.two.userId,
        ticketId: scenario.userTicket.two.ticketId,
        quantity: 6225229,
      },
    })

    expect(result.userId).toEqual(scenario.userTicket.two.userId)
    expect(result.ticketId).toEqual(scenario.userTicket.two.ticketId)
    expect(result.quantity).toEqual(6225229)
  })

  scenario('updates a userTicket', async (scenario: StandardScenario) => {
    const original = (await userTicket({
      id: scenario.userTicket.one.id,
    })) as UserTicket
    const result = await updateUserTicket({
      id: original.id,
      input: { quantity: 8584722 },
    })

    expect(result.quantity).toEqual(8584722)
  })

  scenario('deletes a userTicket', async (scenario: StandardScenario) => {
    const original = (await deleteUserTicket({
      id: scenario.userTicket.one.id,
    })) as UserTicket
    const result = await userTicket({ id: original.id })

    expect(result).toEqual(null)
  })
})
