import EditUserTicketCell from 'src/components/UserTicket/EditUserTicketCell'

type UserTicketPageProps = {
  id: number
}

const EditUserTicketPage = ({ id }: UserTicketPageProps) => {
  return <EditUserTicketCell id={id} />
}

export default EditUserTicketPage
