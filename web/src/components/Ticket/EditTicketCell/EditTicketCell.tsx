import type { EditTicketById, UpdateTicketInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import TicketForm from 'src/components/Ticket/TicketForm'

export const QUERY = gql`
  query EditTicketById($id: Int!) {
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
const UPDATE_TICKET_MUTATION = gql`
  mutation UpdateTicketMutation($id: Int!, $input: UpdateTicketInput!) {
    updateTicket(id: $id, input: $input) {
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

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ ticket }: CellSuccessProps<EditTicketById>) => {
  const [updateTicket, { loading, error }] = useMutation(
    UPDATE_TICKET_MUTATION,
    {
      onCompleted: () => {
        toast.success('Ticket updated')
        navigate(routes.tickets())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateTicketInput,
    id: EditTicketById['ticket']['id']
  ) => {
    updateTicket({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Ticket {ticket?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <TicketForm
          ticket={ticket}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
