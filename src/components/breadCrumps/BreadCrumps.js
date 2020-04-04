import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import './BreadCrumps.scss';

const CrumpSeparator = ({
  hasSeparator
}) => (
  hasSeparator ?
    (
      <span className="meli-l-pad-hor-2">&gt;</span>
    ) : null
);

CrumpSeparator.propTypes = {
  hasSeparator: PropTypes.bool
};

const Crump = ({
  text,
  hasSeparator
}) => (
  <li className={'crumps'.concat(hasSeparator ? '' : ' final')}>
    <span>{text}</span>
    <CrumpSeparator hasSeparator={hasSeparator} />
  </li>
);

Crump.propTypes = {
  hasSeparator: PropTypes.bool,
  text: PropTypes.string
};

const BreadCrumps = ({
  crumps
}) => {
  if (isEmpty(crumps)) {
    return null;
  }
  const crumpsLength = crumps.length;

  return (
    <ul className="breadCrumps meli-l-pad-ver-4">
      {crumps.map(
        (crump, index) => (
          <Crump
            text={crump}
            hasSeparator={index < crumpsLength - 1}
            key={crump}
          />
        )
      )}
    </ul>
  );
};

BreadCrumps.propTypes = {
  crumps: PropTypes.arrayOf(PropTypes.string)
};

export default BreadCrumps;
