// importações de dependências:
import type { Metadata } from "next";

// importações de estilos;
import "./globals.css";

// importações de componentes:
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Header } from "@/components/structure/header";

export const metadata: Metadata = {
  title: "Conta da Sandbr",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className="antialiased"
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
            <Header />
            {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
