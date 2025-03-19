"use client"

// importações de dependências:
import React, { useState, type ReactNode, } from "react";
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

const esquema_de_criacao = z.object({
  email: z.string().min(1, { message: "Precisamos de um e-mail para entrar em contato" }).email({ message: "O e-mail digitado não é válido" })
})

export function CriarConta() {
  const [ botaoEntrar, setBotaoEntrar ] = useState <ReactNode | string>("Entrar");
  const form = useForm<z.infer<typeof esquema_de_criacao>>({
    resolver: zodResolver(esquema_de_criacao),
    defaultValues: {
      email: "",
    },
  });

  function criar(values: z.infer<typeof esquema_de_criacao>) {
    console.log(values)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(criar)} className="flex flex-col gap-4">
        <div>
          
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input placeholder="você@alguma-coisa.com" className="w-88" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">{botaoEntrar}</Button>
      </form>
    </Form>
  );
}