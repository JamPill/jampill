import type { Metadata } from 'next'

export interface SeoMetadata {
  title?: string | null
  description?: string | null
  image?: any | null
}

export interface SeoDoc {
  title?: string | null
  meta?: SeoMetadata | null
}

export function generateMeta(doc: SeoDoc, siteName: string): Metadata {
  const title = doc.meta?.title || doc.title || siteName
  const description = doc.meta?.description || ''
  const ogImage = doc.meta?.image?.url || ''

  return {
    title: title.includes(siteName) ? title : `${title} | ${siteName}`,
    description,
    openGraph: {
      title,
      description,
      images: ogImage ? [{ url: ogImage }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage ? [ogImage] : [],
    },
  }
}
