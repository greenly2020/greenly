import { getAuth } from 'firebase-admin/auth';

export const verifyTokenAndDecodeToken = (tokenId: string) => getAuth().verifyIdToken(tokenId);
