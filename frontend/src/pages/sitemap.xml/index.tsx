import { getServerSideSitemapLegacy } from 'next-sitemap';
import { GetServerSideProps } from 'next';
import { createApolloClient } from '@/api/apolloClient';
import { GetArticlesListDocument } from '@/modules/articles/graphql/query/__generated__/getArticlesList';
import { Article, UsersPermissionsUser } from '@/__generated__/types';
import { GetUsersDocument } from '@/modules/user/graphql/query/__generated__/getUsers';
import { CATEGORIES } from '@/modules/articleEditor/constants';
import { apolloClientServer } from '@/api/apolloClientServer';

const staticURL = [
  {
    loc: `${process.env.BASE_URL}`,
    lastmod: new Date().toISOString(),
    // changefreq
    // priority
  },
  {
    loc: `${process.env.BASE_URL}about`,
    lastmod: new Date().toISOString(),
    // changefreq
    // priority
  },
  {
    loc: `${process.env.BASE_URL}editor`,
    lastmod: new Date().toISOString(),
    // changefreq
    // priority
  },
  {
    loc: `${process.env.BASE_URL}help`,
    lastmod: new Date().toISOString(),
    // changefreq
    // priority
  },
  {
    loc: `${process.env.BASE_URL}write-for-us`,
    lastmod: new Date().toISOString(),
    // changefreq
    // priority
  },
];

const browseURL = CATEGORIES?.map(({ value }: { value: string }) => {
  return {
    loc: `${process.env.BASE_URL}browse/${value}`,
    lastmod: new Date().toISOString(),
    // changefreq
    // priority
  };
});

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { data: articlesData } = await apolloClientServer?.query({
    query: GetArticlesListDocument,
    variables: {
      pagination: {
        limit: -1,
      },
      sort: ['dateCreated:DESC'],
      filters: {
        reviewed: { eq: true },
      },
    },
  });
  const articlesURL = articlesData?.articles?.data?.map(
    ({ attributes }: { attributes: Article }) => {
      return {
        loc: `${process.env.BASE_URL}articles/${attributes?.articleLink}`,
        lastmod: new Date().toISOString(),
      };
    }
  );

  const { data: authorsData } = await apolloClientServer?.query({
    query: GetUsersDocument,
    variables: {
      pagination: {
        limit: -1,
      },
    },
  });

  const authorsURL = authorsData?.usersPermissionsUsers?.data?.map(
    ({ attributes }: { attributes: UsersPermissionsUser }) => {
      let profileLink;
      const regex = /^[a-zA-Z0-9\-_]+$/;
      if (attributes?.profileLink && regex.test(attributes?.profileLink)) {
        profileLink = `${process.env.BASE_URL}user/${attributes?.profileLink}`;
      }
      if (profileLink) {
        return {
          loc: profileLink,
          lastmod: new Date().toISOString(),
          // changefreq
          // priority
        };
      }
    }
  );

  const fields = [...staticURL, ...browseURL, ...articlesURL, ...authorsURL];
  return getServerSideSitemapLegacy(ctx, fields);
};

// Default export to prevent next.js errors
export default function Sitemap() {}
