// TODO(ted): These still point at the old "Greenly" brand profiles from before the rebrand.
// Update to the current Green Place profiles (or set to null to hide the icon in the footer
// until an account exists). Once updated here, the footer AND the homepage's Organization
// JSON-LD (pages/index.tsx) both pick it up automatically — no need to edit them separately.
export const SOCIAL_LINKS = {
  facebook: 'https://www.facebook.com/webelieveingreen',
  twitter: 'https://twitter.com/greenly_co',
  linkedin: 'https://www.linkedin.com/company/greenlyco/',
  instagram: 'https://www.instagram.com/greenly_co/',
} as const;

// Flat array for schema.org sameAs — filters out any null/unset entries.
export const SOCIAL_LINKS_LIST = Object.values(SOCIAL_LINKS).filter(Boolean);
