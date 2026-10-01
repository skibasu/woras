import { createPortal } from "react-dom"

const Portal = ({ children }: { children: React.ReactNode }) => {
    if (typeof document === "undefined" || !document.body) {
        return null
    }

    return createPortal(<div>{children}</div>, document.body)
}

export default Portal
