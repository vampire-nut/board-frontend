import { ReactNode, createContext, useState } from "react";
export type SidebarContextType = {
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
  const [loading, setLoading] = useState<boolean>(false);
  const setLoad = (loading: boolean) => {
    setLoading(loading);
  };

  return (
    <SidebarContext.Provider
      value={{
        loading,
        setLoad,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}
