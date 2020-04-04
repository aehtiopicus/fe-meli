import isEmpty from 'lodash/isEmpty';

export const setCurrencySymbol = (items = [], currency) => (
  !isEmpty(items) ?
    items.map(
      (item) => ({
        ...item,
        price: {
          ...item.price,
          currency: (
            currency.find(
              ({ id }) => id === item.price.currency
            ) || {}
          ).symbol || item.price.currency
        }
      })
    ) :
    items
);

export const formatAmount = (amount) => (
  new Intl.NumberFormat(
    navigator.language
  ).format(amount)
);

export const getCondition = (condition) => (
  condition === 'new' ? 'Nuevo' : 'Usado'
);

export const formatDecimals = (decimals) => (
  String(decimals).substr(2, decimals.length)
);
