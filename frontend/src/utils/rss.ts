import { ArticleEntity } from '@/__generated__/types';
import fs from 'fs';
import { Feed } from 'feed';

export default async function generateRssFeed(allArticles: ArticleEntity[]) {
  const site_url =
    process.env.NODE_ENV === 'production'
      ? 'https://www.greenly.co/'
      : 'http://localhost:3000';

  const feedOptions = {
    title: 'Greenly articles | RSS Feed',
    description: 'Welcome to Greenly!',
    id: site_url,
    site_url: site_url,
    feed_url: `${site_url}/rss.xml`,
    image_url: `${site_url}/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.5e8a279a.png&w=256&q=75`,
    copyright: `All rights reserved ${new Date().getFullYear()}`,
    feedLinks: {
      rss2: `${site_url}/rss.xml`,
      json: `${site_url}/rss.json`,
      atom: `${site_url}/atom.xml`,
    },
  };

  const feed = new Feed(feedOptions);

  // Add each individual article to the feed.
  allArticles.map((article) => {
    feed.addItem({
      title: article.attributes?.title || '',
      description: article.attributes?.abstract || '',
      id: `${site_url}/articles/${article.attributes?.articleLink}`,
      link: `${site_url}/articles/${article.attributes?.articleLink}`,
      date: article.attributes?.dateCreated,
      author: [
        {
          link:
            article?.attributes?.author?.data?.attributes?.profileLink || '',
          name: article?.attributes?.author?.data?.attributes?.name || '',
        },
      ],
    });
  });

  fs.writeFileSync('./public/rss.xml', feed.rss2());
  fs.writeFileSync('./public/rss.json', feed.json1());
  fs.writeFileSync('./public/atom.xml', feed.atom1());
}
