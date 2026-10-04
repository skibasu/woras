import { PropsWithChildren } from "react"
import { motion } from "framer-motion"
import Portal from "../Portal/Portal"
import clsx from "clsx"

type Props = PropsWithChildren & {
    className?: string
    onClose: () => void
}
const Modal = ({ onClose, children, className }: Props) => {
    return (
        <Portal>
            <motion.div
                className={clsx("fixed inset-0 z-100", className)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => {
                    onClose()
                }}
            >
                {children}
            </motion.div>
        </Portal>
    )
}

export default Modal
