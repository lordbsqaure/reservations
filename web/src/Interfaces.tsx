export interface ITicket {
  id: number
  name: string
  TicketType: TicketType
}

export interface IUser {
  id: number
  email: string
}
export interface IUserTicket {
  id: number
  userId: number
  ticketId: number
}

export type TicketType = 'BASIC' | 'STANDARD' | 'PREMIUM'
