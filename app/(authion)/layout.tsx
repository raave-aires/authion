// importações de dependências:
import { ReactNode } from "react";

// importações de componentes:
import { Header } from "@/components/structure/header";

interface LayoutProps {
  children: ReactNode,
}

export default function Layout({ children}: LayoutProps){
  return(
    <>
      <Header />
      {children}
    </>
  );
}