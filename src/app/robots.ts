import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: 'https://docs.skillgate.io/sitemap.xml',
    host: 'https://docs.skillgate.io',
  };
}
