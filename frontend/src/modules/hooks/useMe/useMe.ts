import { useMeQuery } from '@/modules/user/graphql/query/__generated__/me';
import { Role } from '@/types';
import { useMemo } from 'react';

export function useMe() {
  const { data, loading, error, refetch } = useMeQuery({
    fetchPolicy: 'cache-only',
  });

  const isAdmin = useMemo(() => data?.me?.role?.name === Role.admin, [data?.me?.role?.name]);

  return {
    getMe: refetch,
    loading,
    error,
    me: data?.me,
    isAdmin,
  };
}
