import type { Ticket } from '@prisma/client'

import {
  tickets,
  ticket,
  createTicket,
  updateTicket,
  deleteTicket,
} from './tickets'
import type { StandardScenario } from './tickets.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('tickets', () => {
  scenario('returns all tickets', async (scenario: StandardScenario) => {
    const result = await tickets()

    expect(result.length).toEqual(Object.keys(scenario.ticket).length)
  })

  scenario('returns a single ticket', async (scenario: StandardScenario) => {
    const result = await ticket({ id: scenario.ticket.one.id })

    expect(result).toEqual(scenario.ticket.one)
  })

  scenario('creates a ticket', async () => {
    const result = await createTicket({
      input: { name: 'String', TicketType: 'BASIC' },
    })

    expect(result.name).toEqual('String')
    expect(result.TicketType).toEqual('BASIC')
  })

  scenario('updates a ticket', async (scenario: StandardScenario) => {
    const original = (await ticket({ id: scenario.ticket.one.id })) as Ticket
    const result = await updateTicket({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a ticket', async (scenario: StandardScenario) => {
    const original = (await deleteTicket({
      id: scenario.ticket.one.id,
    })) as Ticket
    const result = await ticket({ id: original.id })

    expect(result).toEqual(null)
  })
})
