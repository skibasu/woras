import type { PropsWithChildren } from "react"
import { createPortal } from "react-dom"

interface Props extends PropsWithChildren<{ isOpen: boolean }> {}

const Portal = ({ isOpen, children }: Props) => {
    return isOpen && createPortal(<div>{children}</div>, document.body)
}

export default Portal
