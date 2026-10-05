type Props = {
    gradientClassName?: string
}

const Overlay = ({ gradientClassName = "from-black/80 via-black/40 to-transparent transition-all" }: Props) => {
    return <div className={`absolute inset-0 w-full h-full bg-linear-to-b ${gradientClassName}`} />
}

export default Overlay
