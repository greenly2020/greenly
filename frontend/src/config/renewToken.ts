import firebase from 'firebase/compat/app';

import { LOGIN_BY_TOKEN } from './loginByTokenMutation';
import { JWT_KEY, apolloClient } from '@/api/apolloClient';

export const renewToken = async (currentUser: firebase.User) => {
  // const tokenId = await currentUser.getIdToken();
  // const { data } = await apolloClient?.mutate({
  //   mutation: LOGIN_BY_TOKEN,
  //   variables: {
  //     tokenId,
  //   },
  // });
  // localStorage.setItem(JWT_KEY, data.loginByToken.jwt);
  // return data.loginByToken.jwt;
};
