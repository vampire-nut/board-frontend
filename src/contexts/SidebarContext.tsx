import { ReactNode, createContext, useState } from "react";
export type SidebarContextType = {
    sidebarOpen?: any;
    toggleSidebar?: () => void;
    openSidebar?: () => void;
    closeSidebar?: () => void;
    loading?: boolean;
    setLoad?: (load: boolean) => void;
};

export const SidebarContext = createContext<SidebarContextType>(
    {} as SidebarContextType
);

type Props = {
    children: ReactNode;
};

export function SidebarProvider({ children }: Props) {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
    const closeSidebar = () => setSidebarOpen(false);
    const openSidebar = () => setSidebarOpen(true);
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const [loading, setLoad] = useState<boolean>(false);


    return (
        <SidebarContext.Provider
            value={{
                sidebarOpen,
                toggleSidebar,
                openSidebar,
                closeSidebar,
                loading,
                setLoad,
            }}
        >
            {children}
        </SidebarContext.Provider>
    );
}
