import { UID } from '../../types';
import { getApplicationError } from '../../utils/errorHandlers';
import { lowerCaseAndTrim } from '../../utils/sanitizers';
import { UpdateUsersPermissionsUserInputArgs } from './types';

export const updateUsersPermissionsUserResolver = async (parent, args: UpdateUsersPermissionsUserInputArgs) => {
  const {
    id,
    data: { bio, displayName, email, name, profileLink, profilePicture },
  } = args;

  const user = await strapi.query(UID.USER).findOne({ where: { id } });

  if (!user) {
    throw getApplicationError('User not found');
  }

  if (user.countLogin > 0) {
    throw getApplicationError('User has already registered, profile data cannot be changed');
  }

  if (email) {
    const userWithSameEmail = await strapi.query(UID.USER).findMany({ where: { email: lowerCaseAndTrim(email) } });

    if (userWithSameEmail.length && userWithSameEmail.some(user => +user.id !== +id)) {
      throw getApplicationError('Email already taken');
    }
  }

  if (profileLink) {
    const userWithSameProfile = await strapi
      .query(UID.USER)
      .findMany({ where: { profileLink: lowerCaseAndTrim(profileLink) } });

    if (userWithSameProfile.length && userWithSameProfile.some(user => +user.id !== +id)) {
      throw getApplicationError('Profile link already taken');
    }
  }

  const updatedUser = await strapi.entityService.update(UID.USER, id, {
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
    },
  });

  return { value: updatedUser, info: { resourceUID: UID.USER } };
};
