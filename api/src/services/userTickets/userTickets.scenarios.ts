import type { Prisma, UserTicket } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserTicketCreateArgs>({
  userTicket: {
    one: {
      data: {
        quantity: 2411177,
        User: {
          create: {
            email: 'String7689788',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
        Ticket: { create: { name: 'String', TicketType: 'BASIC' } },
      },
    },
    two: {
      data: {
        quantity: 5665871,
        User: {
          create: {
            email: 'String734919',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
        Ticket: { create: { name: 'String', TicketType: 'BASIC' } },
      },
    },
  },
})

export type StandardScenario = ScenarioData<UserTicket, 'userTicket'>
