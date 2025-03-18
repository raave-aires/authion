// importações de dependências:
import Link from "next/link";

// importações de componentes:
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Login } from "./form";
import { Logo } from "@/components/structure/logo";
import { Tela } from "@/components/structure/tela";

// importações de ícones:


export default function Page() {
	return (
		<Tela>
			<Card>
				<CardHeader>
					<CardTitle>
						<Logo />
					</CardTitle>
					<CardDescription className="select-none">
						Bem-vindo(a) de volta. Entre para continuar.
					</CardDescription>
				</CardHeader>

				<CardContent className="flex flex-col gap-4">
					<div className="grid grid-cols-2 gap-x-4">
						<Button variant="outline">GitHub</Button>
						<Button variant="outline">Google</Button>
					</div>
					<p className="flex items-center gap-x-3 text-sm text-muted-foreground before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">or</p>
					<Login />

					<Button variant="link" asChild className="hover:no-underline"><Link href="/conta/criar" className="group"><p>Não tem uma conta? <span className="group-hover:underline">Crie uma</span></p></Link></Button>
				</CardContent>
			</Card>


		</Tela>
	);
}