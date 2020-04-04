import { formatUrl } from 'url-lib';

import {
  SERVICE_URL,
  SERVICE_PORT,
  API_VERSION
} from './constants';

const getServiceBaseUrl = () => `${SERVICE_URL}:${SERVICE_PORT}/${API_VERSION}`;
const assembleQueryString = (url, params = {}) => (
  formatUrl(
    `${getServiceBaseUrl()}/${url}`,
    params
  )
);

export const sdkRequest = async(url, params, options = {}) => {
  try {
    const response  = await fetch(
      assembleQueryString(url, params),
      options
    );
    const { status: responseStatus, ok } = response;
    const finalResponse = await response.json();

    if (!ok) {
      throw new Error(
        responseStatus === 500 ?
          'UPS! Hubo un error. Inténtalo más tarde' :
          finalResponse.message
      );
    }

    return finalResponse;
  } catch (err) {
    throw err;
  }
};
