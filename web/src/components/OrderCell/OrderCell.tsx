import type {
  DeleteUserTicketMutationVariables,
  FindOrderQuery,
  FindOrderQueryVariables,
} from 'types/graphql'

import {
  Form,
  FormError,
  Label,
  NumberField,
  FieldError,
  Submit,
} from '@redwoodjs/forms'
import { Link, routes } from '@redwoodjs/router'
import {
  type CellSuccessProps,
  type CellFailureProps,
  useMutation,
} from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

import { useAuth } from 'src/auth'
import { IUserTicket } from 'src/Interfaces'
import { truncate, formatEnum } from 'src/lib/formatters'

export const QUERY = gql`
  query FindOrderQuery($id: Int!) {
    tickets: getUserTicket(id: $id) {
      id
      userId
      ticketId
      quantity
      Ticket {
        name
        TicketType
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindOrderQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

const DELETE_USER_TICKET_MUTATION = gql`
  mutation DeleteUserTicketMutation($id: Int!) {
    deleteUserTicket(id: $id) {
      id
    }
  }
`

export const Success = ({
  tickets,
}: CellFailureProps<FindOrderQueryVariables>) => {
  const { currentUser } = useAuth()
  const [deleteUserTicket] = useMutation(DELETE_USER_TICKET_MUTATION, {
    onCompleted: (deleteUserTicket) => {
      console.log(deleteUserTicket.id)
      toast.success('UserTicket deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY, variables: { id: currentUser.id } }],
    awaitRefetchQueries: true,
  })
  const onDeleteClick = (id: DeleteUserTicketMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete userTicket ' + id + '?')) {
      deleteUserTicket({ variables: { id } })
    }
  }
  console.log(tickets)
  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Ticket type</th>
            <th>Quantity</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {tickets?.map((ticket) => (
            <tr key={ticket.id}>
              <td>{truncate(ticket.id)}</td>
              <td>{truncate(ticket.Ticket.name)}</td>
              <td>{formatEnum(ticket?.Ticket?.TicketType)}</td>
              <td>{truncate(ticket.quantity)}</td>
              <td>
                <nav className="rw-table-actions">
                  {/* <Link
                      to={routes.userTicket({ id: ticket.id })}
                      title={'Show userTicket ' + ticket.id + ' detail'}
                      className="rw-button rw-button-small"
                    >
                      Show
                    </Link> */}
                  <Link
                    to={routes.editUserTicket({ id: ticket.id })}
                    title={'Edit userTicket ' + ticket.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete userTicket ' + ticket.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(ticket.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
