import { UID } from '../../types';
import { getApplicationError } from '../../utils/errorHandlers';
import { CreateUsersPermissionsUserInputArgs } from './types';
import { lowerCaseAndTrim } from '../../utils/sanitizers';

export const createUsersPermissionsUserResolver = async (parent, args: CreateUsersPermissionsUserInputArgs) => {
  const {
    data: { bio, displayName, email, name, profileLink, profilePicture },
  } = args;

  if (email) {
    const userWithSameEmail = await strapi.query(UID.USER).findOne({ where: { email: lowerCaseAndTrim(email) } });

    if (userWithSameEmail) {
      throw getApplicationError('Email already taken');
    }
  }

  if (profileLink) {
    const userWithSameProfile = await strapi
      .query(UID.USER)
      .findOne({ where: { profileLink: lowerCaseAndTrim(profileLink) } });

    if (userWithSameProfile) {
      throw getApplicationError('Profile link already taken');
    }
  }

  const pluginStore = await strapi.store({ type: 'plugin', name: 'users-permissions' });
  const settings = await pluginStore.get({ key: 'advanced' });
  const basicRole = await strapi.db.query(UID.ROLE).findOne({ where: { type: settings.default_role } });

  const user = strapi.entityService.create(UID.USER, {
    data: {
      bio,
      name,
      email,
      displayName,
      profileLink,
      countLogin: 0,
      blocked: false,
      profilePicture,
      confirmed: false,
      role: basicRole.id,
    },
  });

  return { value: user, info: { resourceUID: UID.USER } };
};
