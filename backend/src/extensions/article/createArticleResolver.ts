import slug from 'slug';

import { ROLES, UID } from '../../types';
import { getUserFromContext } from '../../utils/getUserFromContext';
import { getApplicationError } from '../../utils/errorHandlers';

export const createArticleResolver = async (root, args, context) => {
  const { id } = getUserFromContext(context);
  const currentUser = await strapi.db.query(UID.USER).findOne({
    where: {
      id,
    },
    populate: ['role'],
  });

  if (currentUser.role.name !== ROLES.ADMIN && args.data.author && +args.data.author !== +currentUser.id) {
    throw getApplicationError('You can only create your own articles ');
  }

  const newArticle = await strapi.entityService.create(UID.ARTICLE, args);

  let articleLink = slug(newArticle?.title || '');
  const articleWithLink = await strapi.db.query(UID.ARTICLE).findMany({
    where: {
      articleLink,
    },
  });

  if (!articleLink || articleWithLink.length) {
    articleLink = slug(`${newArticle.id} ${newArticle?.title || ''}`);
  }

  const updatedArticle = await strapi.entityService.update(UID.ARTICLE, newArticle.id, { data: { articleLink } });

  return { value: updatedArticle, info: { resourceUID: UID.ARTICLE } };
};
