import type { FindUserTicketById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import UserTicket from 'src/components/UserTicket/UserTicket'

export const QUERY = gql`
  query FindUserTicketById($id: Int!) {
    userTicket: userTicket(id: $id) {
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

export const Empty = () => <div>UserTicket not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  userTicket,
}: CellSuccessProps<FindUserTicketById>) => {
  return <UserTicket userTicket={userTicket} />
}
