import type { FindUserTickets } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import UserTickets from 'src/components/UserTicket/UserTickets'

export const QUERY = gql`
  query FindUserTickets {
    userTickets {
      id
      userId
      ticketId
      quantity
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  const { logOut } = useAuth()
  return (
    <div className="rw-text-center">
      <button onClick={logOut}>Log Out</button>
      {'No userTickets yet. '}
      <Link to={routes.newUserTicket()} className="rw-link">
        {'Create one?'}
      </Link>
      <br />
      <Link to={routes.tickets()} className="rw-link">
        {'move to Tickets'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ userTickets }: CellSuccessProps<FindUserTickets>) => {
  return <UserTickets userTickets={userTickets} />
}
