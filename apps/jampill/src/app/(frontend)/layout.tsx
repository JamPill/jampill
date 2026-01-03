import { getPayload } from 'payload'
import config from '@payload-config'
import { Inter, Outfit, Roboto, Gantari, Plus_Jakarta_Sans, Montserrat } from 'next/font/google'
import { Header } from '@/components/Header'
import { Maintenance } from '@/components/Maintenance'
import { NO_INDEX_METADATA } from '@repo/ui'
import './styles.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
})

const gantari = Gantari({
  subsets: ['latin'],
  variable: '--font-gantari',
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plusjakartasans',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
})

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
})

export const dynamic = 'force-dynamic'

export async function generateMetadata() {
  const payload = await getPayload({ config })
  const settings = await payload.findGlobal({ slug: 'settings' })

  return {
    title: settings.appName || 'Payload Blank Template',
    description: settings.appNameExtended || 'A blank template using Payload in a Next.js app.',
    ...NO_INDEX_METADATA,
  }
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const payload = await getPayload({ config })
  const settings = await payload.findGlobal({ slug: 'settings' })

  const brandStyles = `
    :root {
      --primary-color: ${settings.colors?.primary || '#000000'};
      --secondary-color: ${settings.colors?.secondary || '#ffffff'};
      --tertiary-color: ${settings.colors?.tertiary || '#f0f0f0'};
      --font-title-family: var(--font-${(settings.typography?.fontTitle || 'Inter').toLowerCase()});
      --font-body-family: var(--font-${(settings.typography?.fontBody || 'Inter').toLowerCase()});
    }
    h1, h2, h3, h4, h5, h6 {
      font-family: var(--font-title-family);
    }
    body {
      font-family: var(--font-body-family);
      ${settings.accessibility?.underlineLinks ? 'text-decoration: underline;' : ''}
    }
  `

  if (settings.siteState !== 'online') {
    return (
      <html
        lang="it"
        className={`${inter.variable} ${outfit.variable} ${roboto.variable} ${gantari.variable} ${jakarta.variable} ${montserrat.variable}`}
      >
        <head>
          <style dangerouslySetInnerHTML={{ __html: brandStyles }} />
        </head>
        <body>
          <Maintenance state={settings.siteState} />
        </body>
      </html>
    )
  }

  return (
    <html
      lang="it"
      className={`${inter.variable} ${outfit.variable} ${roboto.variable} ${gantari.variable} ${jakarta.variable} ${montserrat.variable}`}
    >
      <head>
        <style dangerouslySetInnerHTML={{ __html: brandStyles }} />
      </head>
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  )
}
