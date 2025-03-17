// importações de dependências:

// importações de componentes:
import { Logo } from "@/components/structure/logo";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Tela } from "@/components/structure/tela";

export default function Page() {
	return (
		<Tela>
			<Card>
				<CardHeader>
					<CardTitle>
						<Logo />
					</CardTitle>
					<CardDescription>
						Entre
					</CardDescription>
				</CardHeader>

				<CardContent>
					<p>teste</p>
				</CardContent>
			</Card>
		</Tela>
	);
}