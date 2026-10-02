"use client"

import type { ButtonHTMLAttributes, MouseEventHandler } from "react"

import clsx from "clsx"

type ButtonColor = "primary"
type ButtonSize = "small" | "large"

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color" | "children" | "onClick"> & {
    color?: ButtonColor
    size?: ButtonSize
    label: string
    onClick?: MouseEventHandler<HTMLButtonElement>
}

const sizeClassMap: Record<ButtonSize, string> = {
    small: "btn-small",
    large: "btn-large",
}

const colorClassMap: Record<ButtonColor, string> = {
    primary: "btn-primary",
}

const Button = ({ color = "primary", size = "small", label, className = "", onClick, type = "button", ...props }: Props) => {
    return (
        <button type={type} className={clsx("btn", sizeClassMap[size], colorClassMap[color], className)} onClick={onClick} {...props}>
            {label}
        </button>
    )
}

export default Button
