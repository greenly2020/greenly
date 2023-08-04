import { UID } from '../../types';

export const articleByLinkResolver = async (root, args, context) => {
  const article = await strapi.db.query(UID.ARTICLE).findOne({
    where: {
      articleLink: args.articleLink,
    },
  });

  return { value: article, info: { resourceUID: UID.ARTICLE } };
};
