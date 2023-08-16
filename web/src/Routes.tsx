// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route, Private } from '@redwoodjs/router'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

import { useAuth } from './auth'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Route path="/user-tickets/{id:Int}/edit" page={UserTicketEditUserTicketPage} name="editUserTicket" />
      <Set wrap={ScaffoldLayout} title="UserTickets" titleTo="userTickets" buttonLabel="New UserTicket" buttonTo="newUserTicket">
        <Route path="/user-tickets/new" page={UserTicketNewUserTicketPage} name="newUserTicket" />

        <Route path="/user-tickets/{id:Int}" page={UserTicketUserTicketPage} name="userTicket" />
        <Route path="/user-tickets" page={UserTicketUserTicketsPage} name="userTickets" />
      </Set>
      <Route path="/order/{id:Int}" page={OrderPage} name="order" />
      <Route path="/login" page={LoginPage} name="login" />
      <Route path="/signup" page={SignupPage} name="signup" />
      <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
      <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      <Private unauthenticated="login">
        <Set wrap={ScaffoldLayout} title="UserTickets" titleTo="userTickets" buttonLabel="New UserTicket" buttonTo="newUserTicket"></Set>
        <Set wrap={ScaffoldLayout} title="Tickets" titleTo="tickets" buttonLabel="New Ticket" buttonTo="newTicket">
          <Route path="/tickets/new" page={TicketNewTicketPage} name="newTicket" />
          <Route path="/tickets/{id:Int}/edit" page={TicketEditTicketPage} name="editTicket" />
          <Route path="/tickets/{id:Int}" page={TicketTicketPage} name="ticket" />
          <Route path="/tickets" page={TicketTicketsPage} name="tickets" />
        </Set>
        <Set wrap={ScaffoldLayout} title="Users" titleTo="users" buttonLabel="New User" buttonTo="newUser">
          <Route path="/users/new" page={UserNewUserPage} name="newUser" />
          <Route path="/users/{id:Int}/edit" page={UserEditUserPage} name="editUser" />
          <Route path="/users/{id:Int}" page={UserUserPage} name="user" />
          <Route path="/users" page={UserUsersPage} name="users" />
        </Set>
        <Route path="/" page={HomePage} name="home" />
      </Private>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
