import TicketCell from 'src/components/Ticket/TicketCell'

type TicketPageProps = {
  id: number
}

const TicketPage = ({ id }: TicketPageProps) => {
  return <TicketCell id={id} />
}

export default TicketPage
