import { UID } from '../../types';
import { getUserFromContext } from '../../utils/getUserFromContext';
import { Args } from './types';

export const removeLikeResolver = async (parent, args: Args, context) => {
  const { articleId } = args;

  const { id: userId } = getUserFromContext(context);

  const article = await strapi.db.query(UID.ARTICLE).findOne({
    where: {
      id: articleId,
    },
    populate: {
      // @ts-ignore
      likedUsers: {
        select: ['id'],
        where: {
          id: userId,
        },
      },
    },
  });

  if (!article) {
    return null;
  }

  if (!article.likedUsers.length) {
    return article;
  } else {
    await strapi.db.connection.raw(
      `
    UPDATE articles
    SET likes = CASE
                  WHEN COALESCE(likes, 0) > 0 
                  THEN likes - 1
                  ELSE 0
                END
    WHERE id = :articleId`,
      { articleId },
    );

    const likedArticle = await strapi.entityService.update(UID.ARTICLE, articleId, {
      data: {
        likedUsers: {
          disconnect: [userId],
        },
      },
    });

    return likedArticle;
  }
};
