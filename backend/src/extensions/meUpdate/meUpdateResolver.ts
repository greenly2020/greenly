import { UID } from '../../types';
import { getUserFromContext } from '../../utils/getUserFromContext';

export const meUpdateResolver = async (parent, args, context) => {
  const graphQlPlugin = strapi.plugin('graphql');
  const { transformArgs } = graphQlPlugin.service('builders').utils;

  const transformedArgs = transformArgs(args, {
    contentType: strapi.contentType(UID.USER),
    usePagination: true,
  });

  const { id } = getUserFromContext(context);

  return strapi.entityService.update(UID.USER, id, transformedArgs);
};
