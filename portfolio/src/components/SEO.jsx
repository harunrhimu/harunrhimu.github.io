import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'

const SITE_URL = 'https://harunrhimu.github.io'
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`
const SITE_NAME = 'Harun | Microsoft Fabric & Power BI'

export default function SEO({
  title,
  description,
  image = DEFAULT_OG_IMAGE,
  type = 'website',
  article = null,
  noIndex = false,
  jsonLd = null,
}) {
  const { pathname } = useLocation()
  const canonicalUrl = `${SITE_URL}${pathname}`
  const fullTitle = title.includes('Harun') ? title : `${title} | Harun`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      {noIndex && <meta name="robots" content="noindex,nofollow" />}

      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {article?.publishedTime && (
        <meta property="article:published_time" content={article.publishedTime} />
      )}
      {article?.author && (
        <meta property="article:author" content={article.author} />
      )}

      {jsonLd && jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  )
}
