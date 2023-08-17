import type {
  DeleteUserTicketMutationVariables,
  FindUserTickets,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import { QUERY } from 'src/components/UserTicket/UserTicketsCell'
import { timeTag, truncate } from 'src/lib/formatters'

const DELETE_USER_TICKET_MUTATION = gql`
  mutation DeleteUserTicketMutation($id: Int!) {
    deleteUserTicket(id: $id) {
      id
    }
  }
`

const UserTicketsList = ({ userTickets }: FindUserTickets) => {
  const { logOut } = useAuth()
  const [deleteUserTicket] = useMutation(DELETE_USER_TICKET_MUTATION, {
    onCompleted: () => {
      toast.success('UserTicket deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteUserTicketMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete userTicket ' + id + '?')) {
      deleteUserTicket({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <button onClick={logOut}>Log Out</button>
      <br />
      <Link to={routes.tickets()} className="rw-link">
        {'move to Tickets'}
      </Link>
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>User id</th>
            <th>Ticket id</th>
            <th>Quantity</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {userTickets.map((userTicket) => (
            <tr key={userTicket.id}>
              <td>{truncate(userTicket.id)}</td>
              <td>{truncate(userTicket.userId)}</td>
              <td>{truncate(userTicket.ticketId)}</td>
              <td>{truncate(userTicket.quantity)}</td>
              <td>{timeTag(userTicket.createdAt)}</td>
              <td>{timeTag(userTicket.updatedAt)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.userTicket({ id: userTicket.id })}
                    title={'Show userTicket ' + userTicket.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editUserTicket({ id: userTicket.id })}
                    title={'Edit userTicket ' + userTicket.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete userTicket ' + userTicket.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(userTicket.id)}
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

export default UserTicketsList
