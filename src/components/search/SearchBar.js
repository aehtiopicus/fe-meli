import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import meliLogo from '../../assets/Logo_ML@2x.png';
import './SearchBar.scss';

export default class SearchBar extends PureComponent {
  constructor(props) {
    super(props);

    const { search } = props;
    this.state = {
      search
    };
  }

  handleOnSubmit = (submitEvent) => {
    const { target: { elements }} = submitEvent;
    const { handleSubmit } = this.props;
    
    submitEvent.preventDefault();

    handleSubmit((elements[0] || {}).value);
  };

  handleOnInputSearch = ({ target: { value: search }}) => {
    this.setState({ search });
  };

  render() {
    const { search } = this.state;

    return (
      <section className="meli-cell meli-cell-1-1 meli-l-pad-ver-1 search-bar">
        <div className="meli-offsite-1-12-left meli-offsite-1-12-right img-logo-container">
          <img src={meliLogo} className="img-logo"/>
          <div className="meli-l-mar-left-10 meli-l-pad-left-10">
            <form onSubmit={this.handleOnSubmit}>
              <div className="meli-flex">
                <input
                  type="text"
                  placeholder="Nunca dejes de buscar"
                  name="search"
                  className="meli-cell meli-cell-1-1 search-bar-input"
                  value={search}
                  onChange={this.handleOnInputSearch}
                />
                <button className="search-bar-button">
                  <i className="icon"/>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  }
}

SearchBar.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  search: PropTypes.string
};

SearchBar.defaultProps = {
  search: ''
};
