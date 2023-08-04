import { ROLES, UID } from '../../types';
import { getApplicationError } from '../../utils/errorHandlers';
import { getUserFromContext } from '../../utils/getUserFromContext';

export const deleteArticleResolver = async (root, args, context) => {
  const { id } = getUserFromContext(context);
  const currentUser = await strapi.db.query(UID.USER).findOne({
    where: {
      id,
    },
    populate: ['role'],
  });

  const oldArticle = await strapi.entityService.findOne(UID.ARTICLE, args.id, { populate: ['author'] });

  if (!oldArticle) {
    throw getApplicationError('Article not found.');
  }
  if (currentUser.role.name !== ROLES.ADMIN && +oldArticle.author.id !== +currentUser.id) {
    throw getApplicationError('You can only delete your own articles.');
  }

  const deletedArticle = await strapi.entityService.delete(UID.ARTICLE, args.id);

  return { value: deletedArticle, info: { resourceUID: UID.ARTICLE } };
};
