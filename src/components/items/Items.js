import React from 'react';
import PropTypes from 'prop-types';

import { formatAmount } from '../../transformations/items';
import meliFreeShipping from '../../assets/ic_shipping@2x.png';
import './Items.scss';

const ITEM_PROPS = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.shape({
    currency: PropTypes.string,
    amount: PropTypes.number,
    decimals: PropTypes.number
  }),
  picture: PropTypes.string,
  condition: PropTypes.string,
  free_shipping: PropTypes.bool,
  address: PropTypes.string
};

const ITEM_SHAPE = PropTypes.shape(ITEM_PROPS);

const FreeSheepingIcon = ({
  freeShipping
}) => (
  !freeShipping ?
    null :
    (
      <img src={meliFreeShipping} className="item-price-img meli-l-pad-left-3" />
    )
);
FreeSheepingIcon.propTypes = {
  freeShipping: PropTypes.bool.isRequired
};

const Item = ({
  id,
  title,
  price: {
    amount,
    currency
  },
  picture,
  free_shipping,
  address,
  onItemSelected
}) => (
  <section id={id} className="meli-l-pad-ver-4 meli-l-pad-left-4 item-row" onClick={onItemSelected}>
    <div className="item-row-content">
      <div className="first-column meli-l-mar-right-4">
        <img src={picture} className="img" />
      </div>
      <div className="second-column meli-l-pad-top-6">
        <span className="item-price meli-l-pad-bot-8">
          {currency}
          {formatAmount(amount)}
          <FreeSheepingIcon freeShipping={free_shipping} />
        </span>
        <span className="item-title">{title}</span>
      </div>
      <div className="third-column meli-l-pad-top-10">
        <div className="meli-offsite-8-12-left">
          <span className="item-address">
            {address}
          </span>
        </div>
      </div>
    </div>
    <div className="item-row-separator meli-l-mar-right-4"></div>
  </section>
);

Item.propTypes = {
  ...ITEM_PROPS
};

const Items = ({
  items,
  onItemSelected
}) => (
  items.map(
    (item) => (
      <Item {...item} key={item.id} onItemSelected={onItemSelected.bind(null, item.id)} />
    )
  )
);

Items.propTypes = {
  items: PropTypes.arrayOf(ITEM_SHAPE),
  onItemSelected: PropTypes.func.isRequired
};

export default Items;
