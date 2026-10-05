import type { SVGProps } from "react"

const CloseIcon = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg viewBox="0 0 64 64" fill="none" {...props} aria-hidden="true">
            <path d="M12 12L52 52" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
            <path d="M52 12L12 52" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
        </svg>
    )
}

export default CloseIcon
