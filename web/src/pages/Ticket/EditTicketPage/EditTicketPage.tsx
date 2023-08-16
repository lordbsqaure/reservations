import EditTicketCell from 'src/components/Ticket/EditTicketCell'

type TicketPageProps = {
  id: number
}

const EditTicketPage = ({ id }: TicketPageProps) => {
  return <EditTicketCell id={id} />
}

export default EditTicketPage
