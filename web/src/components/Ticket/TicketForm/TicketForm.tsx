import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  RadioField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'

import type { EditTicketById, UpdateTicketInput } from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'

type FormTicket = NonNullable<EditTicketById['ticket']>

interface TicketFormProps {
  ticket?: EditTicketById['ticket']
  onSave: (data: UpdateTicketInput, id?: FormTicket['id']) => void
  error: RWGqlError
  loading: boolean
}

const TicketForm = (props: TicketFormProps) => {
  const onSubmit = (data: FormTicket) => {
    props.onSave(data, props?.ticket?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormTicket> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>

        <TextField
          name="name"
          defaultValue={props.ticket?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="TicketType"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Ticket type
        </Label>

        <div className="rw-check-radio-items">
          <RadioField
            id="ticket-TicketType-0"
            name="TicketType"
            defaultValue="BASIC"
            defaultChecked={props.ticket?.TicketType?.includes('BASIC')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Basic</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="ticket-TicketType-1"
            name="TicketType"
            defaultValue="STANDART"
            defaultChecked={props.ticket?.TicketType?.includes('STANDART')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Standart</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="ticket-TicketType-2"
            name="TicketType"
            defaultValue="PREMIUM"
            defaultChecked={props.ticket?.TicketType?.includes('PREMIUM')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Premium</div>
        </div>

        <FieldError name="TicketType" className="rw-field-error" />

        <Label
          name="limit"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Limit
        </Label>

        <NumberField
          name="limit"
          defaultValue={props.ticket?.limit}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="limit" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default TicketForm
