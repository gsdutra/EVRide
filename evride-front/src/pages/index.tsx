import Image from 'next/image';
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import Link from 'next/link'

export default function Home() {
  const [logoColor, setLogoColor] = useState('light');
  const theme = useTheme();
  useEffect(() => {
    if (theme.theme === 'dark' || (theme.systemTheme === 'dark' && theme.theme === 'system')) {
      setLogoColor('dark');
    } else {
      setLogoColor('light');
    }
  }, [theme.theme, theme.systemTheme])
  return (
    <div className='flex flex-col items-center pt-[2rem]'>
      <Image
        src={`/logo_${logoColor}_mode.png`}
        width={350}
        height={100}
        alt="logo"
      />
      <a className="mt-5 text-xl text-center">O seu marketplace de veículos sustentáveis</a>

      <div className="mt-[30px]" />

      <Link href='/anuncios'>
        <button className="button bt bg-blue w-[341px]">
          PROCURAR VEÍCULOS
        </button>
      </Link>

      <Link href='/anunciar'>
        <button className="button bt bg-gray w-[341px]">
          ANUNCIE SEU VEÍCULO
        </button>
      </Link>
    </div>
  )
}
