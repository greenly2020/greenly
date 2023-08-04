import slug from 'slug';

import { ROLES, UID } from '../../types';
import { getApplicationError } from '../../utils/errorHandlers';
import { getUserFromContext } from '../../utils/getUserFromContext';

export const updateArticleResolver = async (root, args, context) => {
  const { id } = getUserFromContext(context);
  const currentUser = await strapi.db.query(UID.USER).findOne({
    where: {
      id,
    },
    populate: ['role'],
  });

  if (currentUser.role.name !== ROLES.ADMIN && args.data.author && +args.data.author !== +currentUser.id) {
    throw getApplicationError('You can not change articles author.');
  }

  const oldArticle = await strapi.entityService.findOne(UID.ARTICLE, args.id, { populate: ['author'] });

  if (!oldArticle) {
    throw getApplicationError('Article not found.');
  }
  if (currentUser.role.name !== ROLES.ADMIN && +oldArticle.author.id !== +currentUser.id) {
    throw getApplicationError('You can only edit your own articles.');
  }

  let articleLink;
  if (args.data.title) {
    let articleLink = slug(args.data.title);
    const articleWithLink = await strapi.db.query(UID.ARTICLE).findMany({
      where: {
        articleLink,
      },
    });

    if (articleWithLink.length > 1 || (articleWithLink.length === 1 && articleWithLink[0].id !== args.id)) {
      articleLink = slug(`${args.id} ${args.data.title}`);
    }
  }

  const updatedArticle = await strapi.entityService.update(UID.ARTICLE, args.id, {
    data: { ...args.data, articleLink },
  });

  return { value: updatedArticle, info: { resourceUID: UID.ARTICLE } };
};
