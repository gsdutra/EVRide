import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className='
        bg-light dark:bg-dark
        text-txtlight dark:text-txtdark
        overflow-x-hidden mt-[90px]
        '>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
