import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { Client } from './_components/client'

export const dynamic = 'force-dynamic'

type Params = {
  locale: string
}

export async function generateMetadata({
  params: { locale },
}: {
  params: Params
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'b' })

  return {
    metadataBase: new URL('https://www.my-url.com/'),
    title: t('title'),
    description: t('title'),
  }
}

export default function B({ params: { locale } }: { params: Params }) {
  unstable_setRequestLocale(locale)

  const t = useTranslations('b')
  return (
    <>
      <p>{t('title')}</p>
      <Client />
    </>
  )
}