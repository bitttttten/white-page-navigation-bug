import nextIntl from 'next-intl/plugin'

const isDev = process.env.NODE_ENV === 'development'

/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: isDev ? '' : '/_web',
  trailingSlash: true,
  experimental: {
    optimizePackageImports: ['primitives'],
  },
  //We need to use file-loader because we import SVGs from primitives/icons which is Vite build package
  //Vite is importing svgs as src string but NextJs is importing them as objects
  //This will make sure that the svgs are imported as strings in NextJs as well.
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find(rule => rule.test?.test?.('.svg'))

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to src strings
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        type: 'asset/resource',
      },
    )

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i

    return config
  },
}

// Use nextIntl to extend your configuration with the next-intl plugin
const withNextIntl = nextIntl('./src/i18n.ts')

export default withNextIntl(nextConfig)
