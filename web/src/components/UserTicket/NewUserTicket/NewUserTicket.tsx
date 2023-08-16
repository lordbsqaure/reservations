import type { CreateUserTicketInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import UserTicketForm from 'src/components/UserTicket/UserTicketForm'

const CREATE_USER_TICKET_MUTATION = gql`
  mutation create($input: CreateUserTicketInput!) {
    createUserTicket(input: $input) {
      id
    }
  }
`

const NewUserTicket = () => {
  const [createUserTicket, { loading, error }] = useMutation(
    CREATE_USER_TICKET_MUTATION,
    {
      onCompleted: () => {
        toast.success('UserTicket created')
        navigate(routes.userTickets())
      },
      onError: (e) => {
        console.log(error.message)
        console.log(e.message)
        toast.error(e.message)
      },
    }
  )

  const onSave = (input: CreateUserTicketInput) => {
    createUserTicket({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New UserTicket</h2>
      </header>
      <div className="rw-segment-main">
        <UserTicketForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewUserTicket
