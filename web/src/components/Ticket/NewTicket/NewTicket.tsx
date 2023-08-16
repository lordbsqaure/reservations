import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import TicketForm from 'src/components/Ticket/TicketForm'

import type { CreateTicketInput } from 'types/graphql'

const CREATE_TICKET_MUTATION = gql`
  mutation CreateTicketMutation($input: CreateTicketInput!) {
    createTicket(input: $input) {
      id
    }
  }
`

const NewTicket = () => {
  const [createTicket, { loading, error }] = useMutation(
    CREATE_TICKET_MUTATION,
    {
      onCompleted: () => {
        toast.success('Ticket created')
        navigate(routes.tickets())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateTicketInput) => {
    createTicket({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Ticket</h2>
      </header>
      <div className="rw-segment-main">
        <TicketForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewTicket
