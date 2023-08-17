import { useEffect } from 'react'

import { ButtonField } from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import OrderCell from 'src/components/OrderCell'
import TicketsCell from 'src/components/TicketsCell'

const HomePage = () => {
  const { currentUser, logOut } = useAuth()

  useEffect(() => {
    if (currentUser?.role == 'ADMIN') {
      navigate(routes.userTickets())
    }
  }, [])
  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <button onClick={logOut}>logout</button>
      <h1>HomePage</h1>

      <TicketsCell />
      <h1>Orders</h1>
      <OrderCell id={currentUser?.id} />
    </>
  )
}

export default HomePage
