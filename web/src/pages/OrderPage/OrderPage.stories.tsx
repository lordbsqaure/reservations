import type { Meta, StoryObj } from '@storybook/react'

import OrderPage from './OrderPage'

const meta: Meta<typeof OrderPage> = {
  component: OrderPage,
}

export default meta

type Story = StoryObj<typeof OrderPage>

export const Primary: Story = {}
