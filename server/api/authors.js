import rp from 'request-promise';

import { MELI_BASE_API, MELI_USERS_API } from './constants';

export const getAuthorDataById = (id) => (
  rp(
    {
      uri: `${MELI_BASE_API}${MELI_USERS_API}${id}`,
      json: true
    }
  )
);
