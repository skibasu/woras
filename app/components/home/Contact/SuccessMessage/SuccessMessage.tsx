import Button from "@/app/components/ui/Button/Button"
import { motion } from "motion/react"
import CloseIcon from "@/app/components/ui/IconsSvg/CloseIcon"

type Props = {
    onClose: () => void
}
const SuccessMessage = ({ onClose }: Props) => {
    return (
        <motion.article
            initial={{
                opacity: 0,
                scale: 0.75,
                y: 40,
                rotateX: 8,
            }}
            animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                rotateX: 0,
            }}
            exit={{
                opacity: 0,
                scale: 0.9,
                y: 20,
                transition: {
                    duration: 0.25,
                    ease: "easeIn",
                },
            }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                mass: 0.8,
            }}
            style={{ transformOrigin: "center center" }}
            className="fixed bg-whte left-1/2 top-1/2 z-100 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl  w-[95vw]  max-w-[95vw] md:max-w-140 px-6 lg:px-8"
        >
            <div className="cart cart-success rounded-2xl shadow-lg">
                <button className="absolute top-5 right-5 flex justify-center items-center w-5 h-5 text-black" aria-label="Close Message" onClick={() => onClose()}>
                    <CloseIcon className="block" aria-hidden="true" />
                </button>
                <div className="py-8">
                    <p className="mb-2 uppercase font-slogan tracking-wide text-primary">You are all set!</p>
                    <h2 className="font-base capitalize font-extrabold mb-6">
                        Thanks for your <span className="text-primary">message!</span>
                    </h2>

                    <p className="mb-10">We’ve received your message and will get back to you as soon as possible. Usually within one business day. i glowna wiadonmosc musi zawiera slowo message alby byc w stylu ace</p>

                    {/* <Button label="Close" size="small" onClick={onClose} /> */}
                </div>
            </div>
        </motion.article>
    )
}

export default SuccessMessage
