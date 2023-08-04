import slug from 'slug';
import { v4 as uuidv4 } from 'uuid';

import { getApplicationError, getTokenExpiredError, getUnauthorizedError } from '../../utils/errorHandlers';
import { Args } from './types';
import { UID } from '../../types';

export const regenerateArticleLinkResolver = async (parent, args: Args, context) => {
  try {
    const articles = await strapi.db.query(UID.ARTICLE).findMany({ select: ['id', 'title'] });

    for (const article of articles) {
      let articleLink = slug(article.title);
      let articleWithLink = await strapi.db.query(UID.ARTICLE).findMany({
        where: {
          articleLink,
        },
        select: ['id'],
      });

      if (articleWithLink.length > 1 || (articleWithLink.length === 1 && articleWithLink[0].id !== article.id)) {
        articleLink = slug(`${article.title}-${article.id}`);

        articleWithLink = await strapi.db.query(UID.ARTICLE).findMany({
          where: {
            articleLink,
          },
          select: ['id'],
        });

        if (articleWithLink.length > 1 || (articleWithLink.length === 1 && articleWithLink[0].id !== article.id)) {
          articleLink = uuidv4();
        }
      }

      await strapi.db.query(UID.ARTICLE).update({
        where: {
          id: article.id,
        },
        data: {
          articleLink,
        },
      });
    }
    return 'ok';
  } catch (err) {
    console.log('debug > err ==== ', err, err.message, err.code);

    throw getApplicationError(err.message);
  }
};
