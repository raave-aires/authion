"use client"

// importações de dependências:
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';

// importações de arquivos:
import Claro from '@/public/logo-branco.svg';
import Escuro from '@/public/logo-preto.svg';

export function Logo() {
  const { resolvedTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <Link href="/">
      <Image
        src={resolvedTheme === 'dark' ? Claro : Escuro}
        width={28}
        alt="logo do zatjini"
        priority={true}
        data-loaded='false'
        onLoad={event => {
          event.currentTarget.setAttribute('data-loaded', 'true')
        }}
        className='data-[loaded=false]:animate-pulse data-[loaded=false]:bg-gray-100/10'
      />
    </Link>
  );
}