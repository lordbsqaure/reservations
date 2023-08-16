import type {
  FindOrderFormQuery,
  FindOrderFormQueryVariables,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { truncate, formatEnum } from 'src/lib/formatters'

export const QUERY = gql`
  query FindOrderFormQuery($id: Int!) {
    tickets: userTicket(id: $id) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindOrderFormQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  tickets,
}: CellSuccessProps<FindOrderFormQuery, FindOrderFormQueryVariables>) => {
  return <h1>studdd</h1>
}
