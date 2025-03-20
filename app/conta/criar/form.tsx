"use client";

// importações de dependências:
import React, { useEffect, useState, type ReactNode, useDeferredValue  } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { zxcvbn, zxcvbnOptions, zxcvbnAsync, ZxcvbnResult  } from '@zxcvbn-ts/core'

// importações de padrões de senha
import * as pacotePadrao from '@zxcvbn-ts/language-common';
import * as pacoteIngles from '@zxcvbn-ts/language-en';
import * as pacotePortugues from '@zxcvbn-ts/language-pt-br'

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
import { EyeIcon, EyeClosedIcon } from "lucide-react";

const esquema_de_criacao = z.object({
  nome: z.string().min(1, { message: "Como devemos te chamar?" }),
  sobrenome: z.string().min(1, { message: "Seu sobrenome é?" }),
  email: z
    .string()
    .min(1, { message: "Precisamos de um e-mail para entrar em contato" })
    .email({ message: "O e-mail digitado não é válido" }),
  senha: z.string(),
});

const parametros_de_senha = {
  graphs: pacotePadrao.adjacencyGraphs,
  dictionary: {
    ...pacotePadrao.dictionary,
    ...pacoteIngles.dictionary,
    ...pacotePortugues.dictionary
  },
  translations: pacoteIngles.translations,
}

zxcvbnOptions.setOptions(parametros_de_senha)

export function CriarConta() {
  const [botaoEntrar, setBotaoEntrar] = useState<ReactNode | string>("Criar");

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
  

  function criar(values: z.infer<typeof esquema_de_criacao>) {
    console.log(values);
  }

  const verificarForcaDaSenha = (senha: string) => {
    const [forcaDaSenha, setForcaDaSenha] = useState("");
    const deferredSenha = useDeferredValue(senha);
  
    useEffect(() => {
      if (!deferredSenha) {
        setForcaDaSenha("");
        return;
      }
  
      zxcvbnAsync(deferredSenha).then((resultado) => {
        const forca =
          resultado.score === 0 ? "Muito fraca" :
          resultado.score === 1 ? "Fraca" :
          resultado.score === 2 ? "Aceitável" :
          resultado.score === 3 ? "Boa" :
          resultado.score === 4 ? "Forte" : "";
        
        setForcaDaSenha(forca);
      });
    }, [deferredSenha]);
  
    return forcaDaSenha;
  }  
  const forcaDaSenha = verificarForcaDaSenha(senha);


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

        <Button type="submit">{botaoEntrar}</Button>
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
