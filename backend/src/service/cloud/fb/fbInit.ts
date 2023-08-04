import { initializeApp, cert, ServiceAccount } from 'firebase-admin/app';

import * as serviceAccount from '../../../../greenly-9aa89-af594bbda610.json';

initializeApp({
  credential: cert(serviceAccount as ServiceAccount),
  storageBucket: 'greenly-9aa89.appspot.com',
});
