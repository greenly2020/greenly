import { initializeApp, cert, ServiceAccount } from 'firebase-admin/app';

import * as serviceAccount from '../../../../greenly-9aa89-7874a7b2bfd1.json';

initializeApp({
  credential: cert(serviceAccount as ServiceAccount),
  storageBucket: 'greenly-9aa89.appspot.com',
});
