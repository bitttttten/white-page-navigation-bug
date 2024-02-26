import { NextFetchEvent, NextMiddleware, NextRequest } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'


export const withNextIntl = (next: NextMiddleware) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    let res = await next(request, _next)
    if (res) {
      //Docs on https://next-intl-docs.vercel.app/docs/getting-started/app-router
      const handleI18nRouting = createIntlMiddleware({
        // A list of all locales that are supported
        locales: ['en'],

        // Used when no locale matches
        defaultLocale: 'en',

        //don't use locale prefix for default locale
        localePrefix: 'as-needed',

        //disable automatic locale detection
        localeDetection: false,
      })
      res = handleI18nRouting(request)
    }

    return res
  }
}
