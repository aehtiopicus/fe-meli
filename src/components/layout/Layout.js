import React from 'react';
import PropTypes from 'prop-types';

import SearchBar from '../../containers/connectSearchBar';

const Layout = ({ children }) => (
  <section className="meli-body">
    <SearchBar />
    <div className="meli-cell meli-cell-1-1 meli-l-pad-ver-1 meli-l-pad-hor-10">
      <div className="meli-offsite-1-12-left meli-offsite-1-12-right">
        {children}
      </div>
    </div>
  </section>
);

Layout.propTypes = {
  children: PropTypes.node
};

export default Layout;
