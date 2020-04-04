import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import { getCondition, formatAmount, formatDecimals } from '../../../transformations/items';
import './Item.scss';

const SecondColumn = ({
  condition,
  sold_quantity: soldQuantity,
  title,
  price: {
    currency,
    amount,
    decimals
  }
}) => (
  <div className="second-column meli-cell meli-cell-3-9">
    <span className="meli-l-pad-bot-4">
      {`${getCondition(condition)} - ${soldQuantity} vendidos`}
    </span>
    <span className="meli-l-pad-bot-8 item-title">{title}</span>
    <span
      className="item-price meli-l-pad-bot-8"
    >
      {currency}
      {formatAmount(amount)}
      <span className="item-price-cents">{formatDecimals(decimals === 0 ? '0.00' : decimals)}</span>
    </span>
    <button className="item-buy">Comprar</button>
  </div>
);

SecondColumn.propTypes = {
  condition: PropTypes.string.isRequired,
  sold_quantity: PropTypes.number,
  title: PropTypes.string.isRequired,
  price: PropTypes.shape({
    amount: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    decimals: PropTypes.number.isRequired
  })
};

const ItemDescription = ({
  description
}) => (
  isEmpty(description) ?
    null :
    (
      <div>
        <h3 className="description-title">Descripción del producto</h3>
        <span className="description-disclaimer meli-l-pad-ver-8">{description}</span>
      </div>
    )
);

ItemDescription.propTypes = {
  description: PropTypes.string
};

const FirstColumn = ({ picture, description }) => (
  <div className="first-column meli-cell meli-cell-6-9">
    <div className="img-container">
      <img src={picture} />
    </div>
    <ItemDescription description={description} />
  </div>
);

FirstColumn.propTypes = {
  picture: PropTypes.string.isRequired,
  description: PropTypes.string
};

const Item = ({
  picture,
  description,
  ...otherProps
}) => (
  <section className="meli-l-pad-hor-8 meli-l-pad-ver-8 item-main-content">
    <FirstColumn picture={picture} description={description} />
    <SecondColumn {...otherProps} />
  </section>
);

Item.propTypes = {
  picture: PropTypes.string,
  description: PropTypes.string
};

export default Item;
