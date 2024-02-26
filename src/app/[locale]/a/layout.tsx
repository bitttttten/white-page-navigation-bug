import { notFound } from 'next/navigation'
import { unstable_setRequestLocale } from 'next-intl/server'

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  // Validate that the incoming `locale` parameter is valid
  if (!['en'].includes(locale)) {
    notFound()
  }
  
  //Needed for static rendering
  //Docs on https://next-intl-docs.vercel.app/docs/getting-started/app-router#static-rendering
  unstable_setRequestLocale(locale)

  return (
    <>
      <html className="dark" lang={locale}>
        <body>
          <main className="font-poppins">
            {children}
          </main>
          <footer>
            hello footer!
          </footer>
        </body>
      </html>
    </>
  )
}
