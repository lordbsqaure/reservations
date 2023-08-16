import type { EditUserTicketById, UpdateUserTicketInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import UserTicketForm from 'src/components/UserTicket/UserTicketForm'

export const QUERY = gql`
  query EditUserTicketById($id: Int!) {
    userTicket: userTicket(id: $id) {
      id
      userId
      ticketId
      quantity
      createdAt
      updatedAt
    }
  }
`
const UPDATE_USER_TICKET_MUTATION = gql`
  mutation UpdateUserTicketMutation($id: Int!, $input: UpdateUserTicketInput!) {
    updateUserTicket(id: $id, input: $input) {
      id
      userId
      ticketId
      quantity
      createdAt
      updatedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  userTicket,
}: CellSuccessProps<EditUserTicketById>) => {
  const [updateUserTicket, { loading, error }] = useMutation(
    UPDATE_USER_TICKET_MUTATION,
    {
      onCompleted: () => {
        toast.success('UserTicket updated')
        navigate(routes.userTickets())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateUserTicketInput,
    id: EditUserTicketById['userTicket']['id']
  ) => {
    updateUserTicket({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit UserTicket {userTicket?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <UserTicketForm
          userTicket={userTicket}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
