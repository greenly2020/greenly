import { makeVar } from '@apollo/client';

export const globalState = {
  currentUserLoading: makeVar<boolean>(true),
};
