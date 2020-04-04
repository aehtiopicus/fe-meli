import React from 'react';
import PropTypes from 'prop-types';

import './EmptyState.scss';

const EmptyState = ({
  message
}) => (
    <div className="empty-state-container">
      <span className="empty-state-container__text">{message}</span>
    </div>
);

EmptyState.propTypes = {
  message: PropTypes.string.isRequired
};

export default EmptyState;
