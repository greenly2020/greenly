import { UID } from '../../types';
import { getUserFromContext } from '../../utils/getUserFromContext';
import { Args } from './types';

export const removeClapResolver = async (parent, args: Args, context) => {
  const { articleId } = args;

  const { id: userId } = getUserFromContext(context);

  const article = await strapi.db.query(UID.ARTICLE).findOne({
    where: {
      id: articleId,
    },
    populate: {
      // @ts-ignore
      clappedUsers: {
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

  if (!article.clappedUsers.length) {
    return article;
  } else {
    await strapi.db.connection.raw(
      `
    UPDATE articles
    SET claps = CASE
                  WHEN COALESCE(claps, 0) > 0 
                  THEN claps - 1
                  ELSE 0
                END
    WHERE id = :articleId`,
      { articleId },
    );

    const clappedArticle = await strapi.entityService.update(UID.ARTICLE, articleId, {
      data: {
        clappedUsers: {
          disconnect: [userId],
        },
      },
    });

    return clappedArticle;
  }
};
