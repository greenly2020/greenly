import { signOut } from 'firebase/auth';
import { auth } from '@/modules/firebase/firebaseSetup';
import { JWT_KEY, apolloClient } from '@/api/apolloClient';

export const logout = async () => {
  await signOut(auth);
  localStorage.removeItem(JWT_KEY);
  apolloClient?.cache.evict({ fieldName: 'me' });
  apolloClient?.cache.gc();
  window.location.href = '/';
};
