type Props = {
    count: number
    selectedIndex: number
    onClick: (index: number) => void
}

const EmblaCorouselDots = ({ count, selectedIndex, onClick }: Props) => {
    return (
        <div className="flex justify-center gap-3">
            {Array.from({ length: count }).map((_, index) => (
                <button key={index} type="button" onClick={() => onClick(index)} aria-label={`Go to page ${index + 1}`} className={`h-3 w-3 rounded-full transition-colors ${index === selectedIndex ? "bg-white" : "bg-white/60"}`} />
            ))}
        </div>
    )
}

export default EmblaCorouselDots
