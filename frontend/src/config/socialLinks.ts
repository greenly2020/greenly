export const SOCIAL_LINKS = {
  facebook: 'https://www.facebook.com/webelieveingreen',
  twitter: 'https://twitter.com/greenly_co',
  linkedin: 'https://www.linkedin.com/company/greenlyco/',
  instagram: 'https://www.instagram.com/greenplace_earth/',
} as const;

// Flat array for schema.org sameAs — filters out any null/unset entries.
export const SOCIAL_LINKS_LIST = Object.values(SOCIAL_LINKS).filter(Boolean);
