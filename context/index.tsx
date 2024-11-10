import { createContext, ReactNode, useState, Dispatch, SetStateAction } from "react";

type AuthContextType = {
    data: any[]; // Tipo `any[]` ou defina o tipo específico dos itens em `data`
    setData: Dispatch<SetStateAction<any[]>>; // Tipo para `setData` usando `Dispatch` e `SetStateAction`
};

// Inicializamos o contexto com um valor padrão de tipo `AuthContextType` ou `null`
export const contextAuth = createContext<AuthContextType | null>(null);

type ContextProviderProps = {
    children: ReactNode;
};

export default function ContextProvider({ children }: ContextProviderProps) {
    const [data, setData] = useState<any[]>([]); // Definindo `data` como um array genérico (ou substitua `any` pelo tipo adequado)

    return (
        <contextAuth.Provider value={{ data, setData }}>
            {children}
        </contextAuth.Provider>
    );
}
