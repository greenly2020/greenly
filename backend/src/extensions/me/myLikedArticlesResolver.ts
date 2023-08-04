import { UID } from '../../types';
import { getUserFromContext } from '../../utils/getUserFromContext';

export const myLikedArticlesResolver = async (parent, args, context) => {
  const graphQlPlugin = strapi.plugin('graphql');
  const { transformArgs } = graphQlPlugin.service('builders').utils;
  const { toEntityResponseCollection } = graphQlPlugin.service('format').returnTypes;

  const { id } = getUserFromContext(context);

  const transformedArgs = transformArgs(args, {
    contentType: strapi.contentType(UID.ARTICLE),
    usePagination: true,
  });

  transformedArgs.filters = {
    likedUsers: {
      id,
    },
  };
  transformedArgs.publicationState = 'live';

  const nodes = await strapi.entityService.findMany(UID.ARTICLE, transformedArgs);

  return toEntityResponseCollection(nodes, {
    args: transformedArgs,
    resourceUID: UID.ARTICLE,
  });
};
