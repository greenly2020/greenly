import { UID } from '../../types';

export const incViewsResolver = async (root, args, context) => {
  const { articleId } = args;
  await strapi.db.connection.raw('UPDATE articles SET views = COALESCE(views, 0) + 1 WHERE id = :articleId', {
    articleId,
  });
  const article = await strapi.entityService.findOne(UID.ARTICLE, args.articleId);

  return { value: article, info: { resourceUID: UID.ARTICLE } };
};
