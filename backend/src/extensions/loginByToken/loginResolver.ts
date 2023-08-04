import slug from 'slug';
import { getAuth } from 'firebase-admin/auth';

import { getApplicationError, getTokenExpiredError, getUnauthorizedError } from '../../utils/errorHandlers';
import { Args } from './types';
import { UID } from '../../types';
import { verifyTokenAndDecodeToken } from '../../service';

export const loginResolver = async (parent, args: Args, context) => {
  try {
    const { tokenId } = args;

    if (!tokenId) {
      throw getUnauthorizedError();
    }

    const decodedToken = await verifyTokenAndDecodeToken(tokenId);

    if (!decodedToken.uid) {
      throw getUnauthorizedError();
    }

    let user = await strapi.db.query(UID.USER).findOne({
      where: {
        extId: decodedToken.uid,
      },
      select: ['id'],
    });

    if (!user) {
      user = await strapi.db.query(UID.USER).findOne({
        where: {
          email: `###old###_${decodedToken.email}`,
        },
        select: ['id'],
      });
    }

    if (!user) {
      const pluginStore = await strapi.store({ type: 'plugin', name: 'users-permissions' });
      const settings = await pluginStore.get({ key: 'advanced' });
      const basicRole = await strapi.db.query(UID.ROLE).findOne({ where: { type: settings.default_role } });

      let profileLink;
      if (decodedToken.name) {
        profileLink = slug(decodedToken.name);
        const countUserWithProfileLink = await strapi.db.query(UID.USER).count({
          where: {
            profileLink,
          },
        });

        if (countUserWithProfileLink > 0) {
          profileLink = decodedToken.uid;
        }
      } else {
        profileLink = decodedToken.uid;
      }

      user = await strapi.db.query(UID.USER).create({
        data: {
          blocked: false,
          role: basicRole.id,
          bio: 'Greenly User',
          extId: decodedToken.uid,
          email: decodedToken.email,
          username: decodedToken.uid,
          displayName:
            typeof decodedToken.name === 'string'
              ? decodedToken.name.replaceAll(' ', '').toLowerCase()
              : decodedToken.uid,
          profileLink,
          name: decodedToken.name || '',
          confirmed: decodedToken.email_verified,
          profilePicture: decodedToken.picture,
        },
      });
    } else {
      user = await strapi.db.query(UID.USER).update({
        where: {
          id: user.id,
        },
        data: {
          extId: decodedToken.uid,
          confirmed: decodedToken.email_verified,
          email: decodedToken.email,
        },
      });
    }
    const serviceJWT = strapi.plugin('users-permissions').service('jwt');

    return {
      jwt: serviceJWT.issue({ id: user.id }),
      user,
    };
  } catch (err) {
    console.log('debug > err ==== ', err, err.message, err.code);
    if (err?.errorInfo?.code === 'auth/id-token-expired') {
      throw getTokenExpiredError();
    }

    throw getApplicationError(err.message);
  }
};
