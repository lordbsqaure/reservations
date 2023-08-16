import type { FindTickets } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Tickets from 'src/components/Ticket/Tickets'

export const QUERY = gql`
  query FindTickets {
    tickets {
      id
      name
      TicketType
      createdAt
      updatedAt
      limit
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No tickets yet. '}
      <Link to={routes.newTicket()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ tickets }: CellSuccessProps<FindTickets>) => {
  return <Tickets tickets={tickets} />
}
