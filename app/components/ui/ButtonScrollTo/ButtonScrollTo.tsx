"use client"
import Link from "next/link"
import { menuScrollTo } from "@/app/helpers/menuScrollTo"
import clsx from "clsx"
type Props = {
    className: string
    target: string
    label: string
    callback?: () => void
}

const handleClick = (event: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    if (typeof window !== "undefined" && window.location.pathname === "/") {
        event.preventDefault()
        menuScrollTo(target)
    }
}
const ButtonScrollTo = ({ className, target, label, callback }: Props) => {
    return (
        <Link
            href={`/#${target}`}
            className={clsx("btn", className)}
            onClick={(event) => {
                handleClick(event, target)
                callback?.()
            }}
        >
            {label}
        </Link>
    )
}

export default ButtonScrollTo
