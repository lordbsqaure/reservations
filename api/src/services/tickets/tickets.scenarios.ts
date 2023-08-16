import type { Prisma, Ticket } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.TicketCreateArgs>({
  ticket: {
    one: { data: { name: 'String', TicketType: 'BASIC' } },
    two: { data: { name: 'String', TicketType: 'BASIC' } },
  },
})

export type StandardScenario = ScenarioData<Ticket, 'ticket'>
