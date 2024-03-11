import React from 'react'
import './button.scss'

interface ButtonProps {
    /**
     * What background color to use
     */
    background?: 'blue' | 'green' | 'yellow' | 'red' | 'grey'
    /**
     * How large should the button be?
     */
    size?: 'small' | 'medium' | 'large'
    /**
     * What type of button it is
     */
    type?: 'button' | 'submit' | 'reset' | undefined
    /**
     * Button contents
     */
    label: string
    /**
     * Optional click handler
     */
    onClick?: () => void
}

/**
 * Button component
 */
export const Button = ({
    size = 'medium',
    background = 'blue',
    type = 'button',
    label,
    ...props
}: ButtonProps) => {
    const sizing: { [size: string]: string } = {
        small: 'text-sm px-4 py-2',
        medium: 'text-md px-6 py-4',
        large: 'text-lg px-7 py-5',
    }
    return (
        <button
            type={type}
            className={`balatro-button rounded-md font-bold tracking-widest text-white bg-bal-${background} ${sizing[size]}`}
            {...props}
        >
            {label}
        </button>
    )
}
