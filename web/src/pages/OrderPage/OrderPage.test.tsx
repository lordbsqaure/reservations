import { render } from '@redwoodjs/testing/web'

import OrderPage from './OrderPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('OrderPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<OrderPage />)
    }).not.toThrow()
  })
})
