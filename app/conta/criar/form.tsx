"use client";

// importações de dependências:
import React, { useState, type ReactNode } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// importações de componentes:
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

//importações de ícones:
import { EyeIcon, EyeClosedIcon, LoaderCircle } from "lucide-react";

const esquema_de_criacao = z.object({
  nome: z.string().min(1, { message: "Como devemos te chamar?" }),
  sobrenome: z.string().min(1, { message: "Seu sobrenome é?" }),
  email: z
    .string()
    .min(1, { message: "Precisamos de um e-mail para entrar em contato" })
    .email({ message: "O e-mail digitado não é válido" }),
  senha: z.string(),
});

function Carregando(){
  return <LoaderCircle className="animate-spin"/>
}

export function CriarConta() {
  const [botaoCriar, setBotaoCriar] = useState<ReactNode | string>("Criar");

  const form = useForm<z.infer<typeof esquema_de_criacao>>({
    resolver: zodResolver(esquema_de_criacao),
    defaultValues: {
      nome: "",
      sobrenome: "",
      email: "",
      senha: "",
    },
  });

  const [exibirSenha, setExibirSenha] = useState<boolean>(false);
  const senha = form.watch("senha");
  const desabilitarBotaoExibirSenha = senha === "" || senha === undefined;
  const [ forcaDaSenha, setForcaDaSenha ] = useState<ReactNode | undefined>(undefined)

  function criar(values: z.infer<typeof esquema_de_criacao>) {
  setBotaoCriar(<Carregando />);
  // simula uma requisição assíncrona só pra exemplo, remove se não for usar
  setTimeout(() => {
    console.log(values);
    setBotaoCriar("Criar");
  }, 2000);
}

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(criar)} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-x-4">
          <FormField
            control={form.control}
            name="nome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Fulano"
                    autoComplete="given-name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sobrenome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sobrenome</FormLabel>
                <FormControl>
                  <Input
                    placeholder="de Tal"
                    autoComplete="family-name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="você@alguma-coisa.com"
                  autoComplete="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="senha"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex justify-between">
                Senha
                <div>
                  {forcaDaSenha}
                </div>
              </FormLabel>
              <FormControl>
                <div className="flex">
                  <Input
                    type={exibirSenha ? "text" : "password"}
                    placeholder="çUahHh-s3nh4r"
                    autoComplete="new-password"
                    className="rounded-r-none"
                    {...field}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-l-none border-l-0"
                    onClick={() => setExibirSenha((prev) => !prev)}
                    disabled={desabilitarBotaoExibirSenha}
                  >
                    {exibirSenha && !desabilitarBotaoExibirSenha ? (
                      <EyeIcon className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <EyeClosedIcon className="h-4 w-4" aria-hidden="true" />
                    )}
                    <span className="sr-only">
                      {exibirSenha ? "Esconder senha" : "Mostrar senha"}
                    </span>
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">{botaoCriar}</Button>
      </form>

      {/* hides browsers password toggles */}
      <style>{`
					.hide-password-toggle::-ms-reveal,
					.hide-password-toggle::-ms-clear {
						visibility: hidden;
						pointer-events: none;
						display: none;
					}
				`}</style>
    </Form>
  );
}
