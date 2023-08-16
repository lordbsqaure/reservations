import UserTicketCell from 'src/components/UserTicket/UserTicketCell'

type UserTicketPageProps = {
  id: number
}

const UserTicketPage = ({ id }: UserTicketPageProps) => {
  return <UserTicketCell id={id} />
}

export default UserTicketPage
