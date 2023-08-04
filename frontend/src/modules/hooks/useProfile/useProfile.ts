import { useMemo } from 'react';

import { useGetUsersQuery } from '@/modules/user/graphql/query/__generated__/getUsers';
import { Role } from '@/types';

export type UserProfileType = {
  id: string;
  bio?: string | null;
  name?: string | null;
  email?: string | null;
  extId?: string | null;
  blocked?: boolean | null;
  confirmed?: boolean | null;
  displayName?: string | null;
  profileLink?: string | null;
  profilePicture?: string | null;
  follows?: string[];
  savedArticles: string[];
  role: {
    name: Role.admin | Role.basicUser;
  };
};

export function useProfile(profileLink: string) {
  const { loading, error, data } = useGetUsersQuery({
    variables: {
      filters: {
        profileLink: { eq: profileLink },
      },
    },
  });

  const user: UserProfileType | null = useMemo(() => {
    if (data?.usersPermissionsUsers?.data) {
      const normalizedUser = {
        id: data?.usersPermissionsUsers?.data?.[0]?.id,
        ...data?.usersPermissionsUsers?.data?.[0]?.attributes,
      };

      return normalizedUser as UserProfileType;
    }
    return null;
  }, [data?.usersPermissionsUsers?.data]);

  return {
    loading,
    error,
    user,
  };
}
