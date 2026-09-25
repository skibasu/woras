import type { ContactQuery } from "@/graphql/generated/graphql"

type OpeningHoursItem = NonNullable<NonNullable<NonNullable<ContactQuery["page"]>["contactPage"]>["openingHours"]>[number]

type Props = {
    items: Array<OpeningHoursItem> | null | undefined
}

const OpeningHours = ({ items }: Props) => {
    if (!items?.length) {
        return null
    }

    return (
        <div>
            <h3 className="mb-6">Opening Hours</h3>
            <div className="space-y-4">
                {items.map((item, index) => {
                    if (!item) {
                        return null
                    }

                    const hours = item.closed ? "Closed" : item.from && item.to ? `${item.from} - ${item.to}` : "Closed"

                    return (
                        <div key={index} className="flex items-center justify-between gap-4">
                            <p>{item.day}</p>
                            <p>{hours}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default OpeningHours
