import type { TicketsQuery } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { truncate, formatEnum } from 'src/lib/formatters'

export const QUERY = gql`
  query TicketsQuery {
    tickets {
      id
      name
      TicketType
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ tickets }: CellSuccessProps<TicketsQuery>) => {
  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Ticket type</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td>{truncate(ticket.id)}</td>
              <td>{truncate(ticket.name)}</td>
              <td>{formatEnum(ticket.TicketType)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.order({ id: ticket.id })}
                    title={'Show ticket ' + ticket.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Order
                  </Link>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
