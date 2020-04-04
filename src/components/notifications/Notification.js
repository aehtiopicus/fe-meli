import React from 'react';
import PropTypes from 'prop-types';

import { NOTIFICATION_TYPE, ERROR_NOTIFICATION } from './constants';
import './Notification.scss';

const Notifications = ({ message, type }) => (
  <div className={['notification', type].join(' ')}>
    {message}
  </div>
);

Notifications.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(NOTIFICATION_TYPE)
};

Notifications.defaultProps = {
  type: ERROR_NOTIFICATION
};

export default Notifications;
