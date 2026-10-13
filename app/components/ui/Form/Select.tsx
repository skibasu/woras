import clsx from "clsx"
import { useEffect, useMemo, useRef, useState } from "react"
import { CountryCode, getCountries, getCountryCallingCode } from "libphonenumber-js"
import Image from "next/image"
import ArrowIcon from "../IconsSvg/ArrowIcon"
import { AnimatePresence, motion } from "motion/react"
type Props = { className: string; initialCountryCode: CountryCode; onChange?: (value: string) => void }

const Select = ({ className, initialCountryCode, onChange }: Props) => {
    const countries = useMemo(
        () =>
            getCountries().map((country) => ({
                code: country,
                callingCode: `+${getCountryCallingCode(country)}`,
                name: new Intl.DisplayNames(["en"], { type: "region" }).of(country),
            })),
        []
    )
    const [selectedCountryCode, setSelectedCountryCode] = useState<CountryCode>(initialCountryCode)
    const [selectOpen, setSelectOpen] = useState(false)
    const selectRef = useRef<HTMLUListElement | null>(null)

    useEffect(() => {
        if (!selectOpen) return

        const handleOutsideClick = (event: PointerEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setSelectOpen(false)
            }
        }

        document.addEventListener("pointerdown", handleOutsideClick)

        return () => {
            document.removeEventListener("pointerdown", handleOutsideClick)
        }
    }, [selectOpen])

    return (
        <div className={className}>
            <button
                className="flex items-center p-3"
                type="button"
                onClick={() => {
                    setSelectOpen((prev) => !prev)
                }}
            >
                <Image
                    src={`/images/flags/${selectedCountryCode.toUpperCase()}.svg`}
                    alt={selectedCountryCode || "Flag"}
                    className="w-6 h-4 mr-2"
                    width={6}
                    height={4}
                />
                <span>{`+${getCountryCallingCode(selectedCountryCode)}`}</span>
                <div className="w-3 h-3 ml-1 ">
                    <ArrowIcon
                        className={clsx(
                            "w-full h-full transition-transform text-black",
                            selectOpen ? "rotate-270" : "rotate-90"
                        )}
                    />
                </div>
            </button>
            <AnimatePresence>
                {selectOpen && (
                    <motion.ul
                        ref={selectRef}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 w-75 bg-white border border-gray-300 rounded-md shadow-lg  max-h-60 overflow-y-auto z-90 p-3"
                    >
                        {countries.map(({ code, callingCode, name }) => (
                            <li key={code}>
                                <button
                                    className="flex items-center hover:bg-accent/10 rounded-sm transition-colors w-full"
                                    type="button"
                                    onClick={() => {
                                        setSelectedCountryCode(code)
                                        onChange?.(code)
                                        setSelectOpen(false)
                                    }}
                                >
                                    <Image
                                        src={`/images/flags/${code.toUpperCase()}.svg`}
                                        alt={name || "Flag"}
                                        className="w-6 h-4 mr-2"
                                        width={6}
                                        height={4}
                                        loading="lazy"
                                    />
                                    {callingCode} {name}
                                </button>
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Select
