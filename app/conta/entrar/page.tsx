// importações de dependências:
import Link from "next/link";
import type { Metadata } from "next";

// importações de componentes:
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Login } from "./form";
import { Tela } from "@/components/structure/tela";

// importações de ícones:
import { SiGithub, SiGoogle } from "@icons-pack/react-simple-icons"

export const metadata: Metadata = {
	title: "Entrar"
}

export default function Page() {
	return (
		<Tela>
			<Card>
				<CardHeader>
					<CardTitle className="font-averia text-4xl">
						raavë
					</CardTitle>
					<CardDescription className="select-none">
						Bem-vindo(a) de volta. Entre para continuar.
					</CardDescription>
				</CardHeader>

				<CardContent className="flex flex-col gap-4">
					<div className="grid grid-cols-2 gap-x-4">
						<Button variant="outline"><SiGithub /> GitHub</Button>
						<Button variant="outline"><SiGoogle /> Google</Button>
					</div>
					<p className="flex items-center gap-x-3 text-sm text-muted-foreground before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">ou</p>
					<Login />

					<Button type="button" variant="link" asChild className="hover:no-underline"><Link href="/conta/criar" className="group"><p>Não tem uma conta? <span className="group-hover:underline">Crie uma</span></p></Link></Button>
				</CardContent>
			</Card>


		</Tela>
	);
}