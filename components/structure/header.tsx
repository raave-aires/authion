// importações de componentes:
import { Theme } from "../ui/theme-toggle";
import { Logo } from "./logo";

export function Header(){
  return(
    <header className="sticky h-14 top-0 flex items-center bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/60 border-b border-border">
      <nav className="flex w-full items-center justify-between mx-8">
        <Logo />
        <div>
          <Theme />
        </div>
      </nav>
    </header>
  );
};