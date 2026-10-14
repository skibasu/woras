type Props = {
    companyName: string
    eyebrow: string
}
const LogoExtended = async ({ companyName, eyebrow }: Props) => {
    return (
        <div className="flex items-center gap-4 mb-8">
            <div>
                <h1 className="font-slogan text-3xl lg:text-5xl text-accent shadow-sm with-accent-separator-left flex items-center">
                    {companyName}
                </h1>
                <p className="text-eyebrow text-white/80 with-accent-separator-left with-empty-separator-left">
                    {eyebrow}
                </p>
            </div>
        </div>
    )
}

export default LogoExtended
