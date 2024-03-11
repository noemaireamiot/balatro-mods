import type { Meta, StoryObj } from '@storybook/react'

import { Button } from '@/components/Button/Button'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'Balatro/Button',
    component: Button,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {
        background: {
            control: 'select',
            options: ['blue', 'green', 'yellow', 'red', 'grey'],
        },
        size: {
            control: 'select',
            options: ['small', 'medium', 'large'],
        },
    },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Blue: Story = {
    args: {
        background: 'blue',
        label: 'Button',
        size: 'medium',
    },
}

export const Secondary: Story = {
    args: {
        background: 'blue',
        label: 'Button',
    },
}
