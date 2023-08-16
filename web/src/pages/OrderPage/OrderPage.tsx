import { CreateUserTicketInput } from 'types/graphql'

import {
  Form,
  FormError,
  Label,
  NumberField,
  FieldError,
  Submit,
  RWGqlError,
} from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

import { useAuth } from 'src/auth'
import UserTicketForm from 'src/components/UserTicket/UserTicketForm/UserTicketForm'
import { IUserTicket } from 'src/Interfaces'
const CREATE_USER_TICKET_MUTATION = gql`
  mutation CreateUserTicketMutation($input: CreateUserTicketInput!) {
    createUserTicket(input: $input) {
      id
    }
  }
`

interface IOrderProps {
  id: number
  userTicket: IUserTicket
  error: RWGqlError
}

const OrderPage = (props: IOrderProps) => {
  const { currentUser } = useAuth()
  const [createUserTicket, { loading, error }] = useMutation(
    CREATE_USER_TICKET_MUTATION,
    {
      onCompleted: () => {
        navigate(routes.home())
      },
      onError: (e) => {
        console.log(error)
        toast.error(e.message)
      },
    }
  )

  const onSubmit = (input: IUserTicket) => {
    createUserTicket({ variables: { input } })
  }

  return (
    <>
      <MetaTags title="Order" description="Order page" />

      <h1>OrderPage</h1>
      <div className="rw-form-wrapper">
        <Form onSubmit={onSubmit} error={props.error}>
          <FormError
            error={error}
            wrapperClassName="rw-form-error-wrapper"
            titleClassName="rw-form-error-title"
            listClassName="rw-form-error-list"
          />

          <Label
            name="userId"
            className="rw-label"
            errorClassName="rw-label rw-label-error"
          >
            User id
          </Label>

          <NumberField
            name="userId"
            defaultValue={currentUser?.id}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />

          <FieldError name="userId" className="rw-field-error" />

          <Label
            name="ticketId"
            className="rw-label"
            errorClassName="rw-label rw-label-error"
          >
            Ticket id
          </Label>

          <NumberField
            name="ticketId"
            defaultValue={props.id}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />

          <FieldError name="ticketId" className="rw-field-error" />

          <Label
            name="quantity"
            className="rw-label"
            errorClassName="rw-label rw-label-error"
          >
            Quantity
          </Label>

          <NumberField
            name="quantity"
            //  defaultValue={props.userTicket?.quantity}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />

          <FieldError name="quantity" className="rw-field-error" />

          <div className="rw-button-group">
            <Submit disabled={loading} className="rw-button rw-button-blue">
              Save
            </Submit>
          </div>
        </Form>
      </div>
    </>
  )
}

export default OrderPage
