import { UID } from '../../types';
import { getUserFromContext } from '../../utils/getUserFromContext';

export const myClapResolver = async (parent, _, context) => {
  const { id: userId } = getUserFromContext(context);
  if (!userId) {
    return false;
  }

  const myClapResult = await strapi.db.connection.raw(
    `
    SELECT 1
    FROM articles_clapped_users_links
    WHERE article_id = :articleId AND user_id = :userId
  `,
    {
      articleId: parent.id,
      userId,
    },
  );

  return myClapResult?.rowCount > 0;
};
