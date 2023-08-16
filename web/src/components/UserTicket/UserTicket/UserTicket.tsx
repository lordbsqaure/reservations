import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

import type {
  DeleteUserTicketMutationVariables,
  FindUserTicketById,
} from 'types/graphql'

const DELETE_USER_TICKET_MUTATION = gql`
  mutation DeleteUserTicketMutation($id: Int!) {
    deleteUserTicket(id: $id) {
      id
    }
  }
`

interface Props {
  userTicket: NonNullable<FindUserTicketById['userTicket']>
}

const UserTicket = ({ userTicket }: Props) => {
  const [deleteUserTicket] = useMutation(DELETE_USER_TICKET_MUTATION, {
    onCompleted: () => {
      toast.success('UserTicket deleted')
      navigate(routes.userTickets())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteUserTicketMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete userTicket ' + id + '?')) {
      deleteUserTicket({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            UserTicket {userTicket.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{userTicket.id}</td>
            </tr>
            <tr>
              <th>User id</th>
              <td>{userTicket.userId}</td>
            </tr>
            <tr>
              <th>Ticket id</th>
              <td>{userTicket.ticketId}</td>
            </tr>
            <tr>
              <th>Quantity</th>
              <td>{userTicket.quantity}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(userTicket.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(userTicket.updatedAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editUserTicket({ id: userTicket.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(userTicket.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default UserTicket
