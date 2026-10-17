"use client"

import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react"
import { stagger, useAnimate, usePresence } from "motion/react"
import clsx from "clsx"

type Props = {
    text: string
    textAccented: string
    textEnd: string
    className?: string
    letterClassName?: string
    counter: number
    setCounter: React.Dispatch<React.SetStateAction<number>>
}

type Word = {
    word: string
    isAccented: boolean
    isEnd: boolean
}

type Words = Word[]

const punctuationRegex = /^[?!.,:;…*%$#)\]}»'"”’\-]+$/

const SplitTextToSpans = ({ text, textAccented, textEnd, className, letterClassName, counter, setCounter }: Props) => {
    const [isPresent, safeToRemove] = usePresence()
    const linesRef = useRef<HTMLSpanElement[]>([])
    const lettersRef = useRef<(HTMLSpanElement | null)[][]>([])
    const [scope, animate] = useAnimate()
    const containerRef = useRef<HTMLDivElement>(null)
    const measureRef = useRef<HTMLSpanElement>(null)

    const [lines, setLines] = useState<Words[]>([])

    const splitWords = (value: string) => (value.trim() ? value.trim().split(/\s+/) : [])

    const words = splitWords(text)
    const wordsAccented = splitWords(textAccented)
    const wordsEnd = splitWords(textEnd)

    const allWords: Words = [
        ...words.map((word) => ({
            word,
            isAccented: false,
            isEnd: false,
        })),
        ...wordsAccented.map((word) => ({
            word,
            isAccented: true,
            isEnd: false,
        })),
        ...wordsEnd.map((word) => ({
            word,
            isAccented: false,
            isEnd: true,
        })),
    ]

    const mergedWords: Words = []

    allWords.forEach((item) => {
        if (punctuationRegex.test(item.word) && mergedWords.length > 0) {
            mergedWords.push({
                ...item,
                isAccented: false,
                isEnd: true,
            })
        } else {
            mergedWords.push({ ...item })
        }
    })

    useLayoutEffect(() => {
        const container = containerRef.current
        const measureElement = measureRef.current

        if (!container || !measureElement) return

        const measureLines = () => {
            const elements = measureElement.querySelectorAll<HTMLElement>("[data-word]")

            const grouped: { top: number; words: Words }[] = []

            elements.forEach((element, index) => {
                const top = element.offsetTop
                const item = mergedWords[index]

                if (!item) return

                let line = grouped.find((group) => Math.abs(group.top - top) < 2)

                if (!line) {
                    line = {
                        top,
                        words: [],
                    }

                    grouped.push(line)
                }

                line.words.push(item)
            })
            const nextLines = grouped.map((line) => line.words)
            // setLines(grouped.map((line) => line.words))
            setLines((previousLines) => {
                const unchanged =
                    previousLines.length === nextLines.length &&
                    previousLines.every(
                        (line, index) =>
                            line.length === nextLines[index].length &&
                            line.every(
                                (word, wordIndex) =>
                                    word.word === nextLines[index][wordIndex].word &&
                                    word.isAccented === nextLines[index][wordIndex].isAccented &&
                                    word.isEnd === nextLines[index][wordIndex].isEnd
                            )
                    )

                return unchanged ? previousLines : nextLines
            })
        }

        measureLines()

        const observer = new ResizeObserver(measureLines)
        observer.observe(container)
        observer.observe(measureElement)

        return () => observer.disconnect()
    }, [text, textAccented, textEnd])

    const handleAnimation = async () => {
        linesRef.current.map(async (element, lineIndex) => {
            const letters = lettersRef.current[lineIndex] ?? []
            if (!element) return
            if (!letters.length) return
            if (counter === 0) return

            animate(
                element,
                {
                    opacity: [0, 1],
                    x: [lineIndex % 2 === 0 ? -120 : 120, 0],
                },
                {
                    duration: 0.7,
                }
            )

            animate(
                letters,
                {
                    opacity: [0.5, 1],
                    x: [0, 16],
                    // rotate: [0, -8, 0],
                },
                {
                    duration: 0.2,
                    delay: stagger(0.035, { startDelay: 0.6 }),
                }
            )
        })
        setCounter((prevCounter) => prevCounter + 1)
    }

    const handleExitAnimation = async () => {
        await Promise.all(
            linesRef.current.map(async (element, lineIndex) => {
                if (!element) return

                const letters = lettersRef.current[lineIndex] ?? []

                await animate(
                    letters,
                    {
                        opacity: [1, 0],
                        x: 12,
                    },
                    {
                        duration: 0.2,

                        delay: stagger(0.055, { from: "last" }),
                    }
                )
            })
        )

        safeToRemove?.()
    }

    useEffect(() => {
        if (lines.length === 0) return

        if (isPresent) {
            handleAnimation()
        } else {
            handleExitAnimation()
        }
    }, [lines, isPresent])

    return (
        <div
            ref={containerRef}
            className={clsx("relative", className)}
        >
            {/* Invisible text used to measure line wrapping */}
            <span
                ref={measureRef}
                aria-hidden="true"
                className={clsx("pointer-events-none  block w-full", counter === 0 ? "" : "invisible")}
            >
                {mergedWords.map((item, index) => (
                    <Fragment key={`${index}-${item.word}`}>
                        {index > 0 && !punctuationRegex.test(item.word) && " "}

                        <span
                            data-word={item.word}
                            className={clsx("inline-block whitespace-nowrap", item.isAccented && "text-accent")}
                        >
                            {item.word}
                        </span>
                    </Fragment>
                ))}
            </span>

            {/* Each animated line contains letters directly */}
            <div
                aria-label={[text, textAccented, textEnd].filter(Boolean).join(" ")}
                role="text"
                ref={scope}

                className="absolute inset-0 overflow-hidden"
            >
                {lines.map((line, lineIndex) => (
                    <span
                        ref={(element) => {
                            if (element !== null) {
                                linesRef.current[lineIndex] = element
                            }
                        }}
                        key={`${lineIndex}-${line.map((item) => item.word).join(" ")}`}
                        className="animated-line block whitespace-nowrap"
                    >
                        {line.map((item, wordIndex) => (
                            <Fragment key={`${lineIndex}-${wordIndex}-${item.word}`}>
                                {wordIndex > 0 && !punctuationRegex.test(item.word) && "\u00A0"}

                                {Array.from(item.word).map((char, charIndex) => (
                                    <span
                                        ref={(element) => {
                                            if (!lettersRef.current[lineIndex]) {
                                                lettersRef.current[lineIndex] = []
                                            }

                                            const letterIndex =
                                                line
                                                    .slice(0, wordIndex)
                                                    .reduce((total, word) => total + Array.from(word.word).length, 0) +
                                                charIndex

                                            lettersRef.current[lineIndex][letterIndex] = element
                                        }}
                                        key={`${wordIndex}-${charIndex}-${char}`}
                                        className={clsx(
                                            "animated-letter inline-block",
                                            letterClassName,
                                            item.isAccented && "text-accent",
                                            item.isEnd && "text-white"
                                        )}
                                    >
                                        {char}
                                    </span>
                                ))}
                            </Fragment>
                        ))}
                    </span>
                ))}
            </div>
        </div>
    )
}

export default SplitTextToSpans
