type SeoInput = {
  title: string;
  description: string;
  pathname: string;
  siteUrl: string;
};

export const buildCanonicalUrl = ({ pathname, siteUrl }: SeoInput) => {
  return new URL(pathname, siteUrl).toString();
};

export const buildPageTitle = (title: string) => title;
