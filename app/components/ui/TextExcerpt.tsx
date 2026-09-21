type Props = {
    text: string
    maxLength: number
}

export const TextExcerpt = ({ text, maxLength }: Props) => {
    if (text.length <= maxLength) {
        return <>{text}</>
    }

    return <>{text.slice(0, maxLength)}...</>
}
