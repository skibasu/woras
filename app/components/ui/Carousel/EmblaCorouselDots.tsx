type Props = {
    count: number
    selectedIndex: number
    onClick: (index: number) => void
    onMouseEnter?: () => void
    onMouseLeave?: () => void
}

const EmblaCorouselDots = ({ count, selectedIndex, onClick, onMouseEnter, onMouseLeave }: Props) => {
    return (
        <div className="dots-wrapper w-full flex justify-center" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <div className="flex justify-center gap-3">
                {Array.from({ length: count }).map((_, index) => (
                    <button key={index} type="button" onClick={() => onClick(index)} aria-label={`Go to page ${index + 1}`} className={`h-4 w-4 rounded-full transition-colors ${index === selectedIndex ? "bg-primary" : "bg-white/70"}`} />
                ))}
            </div>
        </div>
    )
}

export default EmblaCorouselDots
