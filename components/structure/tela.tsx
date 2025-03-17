// importações de dependências:
import { ReactNode } from "react";

interface Props {
  children: ReactNode,
}

export function Tela({ children }: Props){
  return(
    <main className="min-h-screen w-full flex flex-col items-center justify-center">
      {children}
    </main>
  )
}