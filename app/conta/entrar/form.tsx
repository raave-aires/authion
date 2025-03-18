"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const esquema_de_login = z.object({
  email: z.string().email(),
  password: z.string()
})

export function Login() {
  const form = useForm<z.infer<typeof esquema_de_login>>({
    resolver: zodResolver(esquema_de_login),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof esquema_de_login>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail ou nome de usuário</FormLabel>
              <FormControl>
                <Input placeholder="você@alguma-coisa.com" className="w-88" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex justify-between">
                Senha
                <Button variant="link" className="cursor-pointer text-muted-foreground hover:text-black dark:hover:text-white p-0 h-3.5" asChild>
                  <Link href="/conta/esqueci-a-senha">Esqueceu sua senha?</Link>
                </Button>
              </FormLabel>
              <FormControl>
                <Input type="password" className="w-88" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Entrar</Button>
      </form>
    </Form>
  )
}
