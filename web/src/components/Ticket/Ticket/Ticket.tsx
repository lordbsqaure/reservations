import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { formatEnum, timeTag } from 'src/lib/formatters'

import type {
  DeleteTicketMutationVariables,
  FindTicketById,
} from 'types/graphql'

const DELETE_TICKET_MUTATION = gql`
  mutation DeleteTicketMutation($id: Int!) {
    deleteTicket(id: $id) {
      id
    }
  }
`

interface Props {
  ticket: NonNullable<FindTicketById['ticket']>
}

const Ticket = ({ ticket }: Props) => {
  const [deleteTicket] = useMutation(DELETE_TICKET_MUTATION, {
    onCompleted: () => {
      toast.success('Ticket deleted')
      navigate(routes.tickets())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteTicketMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete ticket ' + id + '?')) {
      deleteTicket({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Ticket {ticket.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{ticket.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{ticket.name}</td>
            </tr>
            <tr>
              <th>Ticket type</th>
              <td>{formatEnum(ticket.TicketType)}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(ticket.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(ticket.updatedAt)}</td>
            </tr>
            <tr>
              <th>Limit</th>
              <td>{ticket.limit}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editTicket({ id: ticket.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(ticket.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Ticket
