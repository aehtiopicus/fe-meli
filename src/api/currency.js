import { sdkRequest } from './utils';

const CURRENCY_PROVIDER = 'currency';

export const fetchAllCurrencies = () => sdkRequest(CURRENCY_PROVIDER);
