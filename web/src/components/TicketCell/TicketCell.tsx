import type { FindTicketQuery, FindTicketQueryVariables } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query FindTicketQuery($id: Int!) {
    ticket: ticket(id: $id) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindTicketQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  ticket,
}: CellSuccessProps<FindTicketQuery, FindTicketQueryVariables>) => {
  return <div>{JSON.stringify(ticket)}</div>
}
