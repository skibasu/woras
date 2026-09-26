import Overlay from "@/app/components/ui/Overlay/Overlay"

const MenuDrawer = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="fixed top-0 right-0 left-0 w-full h-full z-50 flex flex-col">
            <Overlay />
            <div className="bg-background h-full w-65 max-w-3/4 relative z-10 rounded-br-lg rounded-tr-lg ">{children}</div>
        </div>
    )
}

export default MenuDrawer
