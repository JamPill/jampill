import type { Metadata, MetadataRoute } from 'next'

/**
 * Metadata standard per impedire l'indicizzazione.
 * Da usare nel root layout.tsx
 */
export const NO_INDEX_METADATA: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

/**
 * Configurazione robots.txt per bloccare tutti i crawler.
 * Da usare in src/app/robots.ts
 */
export const BLOCK_ALL_ROBOTS: MetadataRoute.Robots = {
  rules: {
    userAgent: '*',
    disallow: '/',
  },
}

/**
 * Configurazione robots.txt per permettere l'indicizzazione (escludendo admin).
 * Da usare quando il sito va in produzione.
 */
export const ALLOW_ALL_ROBOTS: MetadataRoute.Robots = {
  rules: {
    userAgent: '*',
    allow: '/',
    disallow: ['/admin', '/api'],
  },
}
