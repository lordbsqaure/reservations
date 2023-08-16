import type { EditUserTicketById, UpdateUserTicketInput } from 'types/graphql'

import {
  Form,
  FormError,
  FieldError,
  Label,
  NumberField,
  Submit,
} from '@redwoodjs/forms'
import type { RWGqlError } from '@redwoodjs/forms'

type FormUserTicket = NonNullable<EditUserTicketById['userTicket']>

interface UserTicketFormProps {
  userTicket?: EditUserTicketById['userTicket']
  onSave: (data: UpdateUserTicketInput, id?: FormUserTicket['id']) => void
  error: RWGqlError
  loading: boolean
}

const UserTicketForm = (props: UserTicketFormProps) => {
  const onSubmit = (data: FormUserTicket) => {
    props.onSave(data, props?.userTicket?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormUserTicket> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
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
          defaultValue={props.userTicket?.userId}
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
          defaultValue={props.userTicket?.ticketId}
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
          defaultValue={props.userTicket?.quantity}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="quantity" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default UserTicketForm
