import { getUserFromContext } from '../../utils/getUserFromContext';

export const myLikeResolver = async (parent, _, context) => {
  const { id: userId } = getUserFromContext(context);
  if (!userId) {
    return false;
  }

  const myLikeResult = await strapi.db.connection.raw(
    `
    SELECT 1
    FROM articles_liked_users_links
    WHERE article_id = :articleId AND user_id = :userId
  `,
    {
      articleId: parent.id,
      userId,
    },
  );

  return myLikeResult?.rowCount > 0;
};
