import type { FindTicketById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Ticket from 'src/components/Ticket/Ticket'

export const QUERY = gql`
  query FindTicketById($id: Int!) {
    ticket: ticket(id: $id) {
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

export const Empty = () => <div>Ticket not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ ticket }: CellSuccessProps<FindTicketById>) => {
  return <Ticket ticket={ticket} />
}
