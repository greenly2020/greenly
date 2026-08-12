import Head from 'next/head';

export const SITE_NAME = 'Green Place';
// process.env.BASE_URL is already wired through next.config.js -> env.BASE_URL
export const SITE_URL = (process.env.BASE_URL || 'https://greenplace.earth').replace(/\/$/, '');
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.png`;

export interface SeoProps {
  /** Page-specific title. "| Green Place" is appended automatically unless already present. */
  title: string;
  /** 1-2 sentence description, ideally 120-160 characters. Should be unique per page. */
  description: string;
  /** Path only, e.g. "/about" or "/articles/my-article". Used to build canonical + og:url. */
  path: string;
  /** Absolute URL to an image for social previews. Falls back to a site default. */
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile';
  /** Set true for utility/account pages (login, search results, submit form, etc). */
  noindex?: boolean;
  /** ISO date string, only used when ogType="article". */
  publishedTime?: string;
  /** Optional JSON-LD structured data object (Article, Organization, WebSite, etc). */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const buildTitle = (title: string) =>
  title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

export const Seo = ({
  title,
  description,
  path,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  noindex = false,
  publishedTime,
  jsonLd,
}: SeoProps) => {
  const url = `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
  const fullTitle = buildTitle(title);
  const jsonLdArray = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />
      <link rel="canonical" href={url} key="canonical" />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />

      {/* Open Graph */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      {ogType === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {jsonLdArray.map((entry, i) => (
        // eslint-disable-next-line react/no-danger
        <script
          key={`jsonld-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(entry) }}
        />
      ))}
    </Head>
  );
};
