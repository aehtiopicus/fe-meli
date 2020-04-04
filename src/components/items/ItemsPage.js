import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import BreadCrumps from '../breadCrumps/BreadCrumps';
import Items from './Items';
import Notifications from '../notifications/Notification';
import EmptyState from '../emptyStates/EmptyState';

export default class ItemsPage extends PureComponent {
  static propTypes = {
    searchItems: PropTypes.func.isRequired,
    search: PropTypes.string,
    onItemDetailSelected: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      items: [],
      categories: [],
      showError: false
    };
  }

  componentDidMount() {
    this.handleSearchItems();
  }

  componentDidUpdate({ search: prevSearch }) {
    const { search } = this.props;

    if (search !== prevSearch) {
      this.handleSearchItems();
    }
  }

  handleSearchItems = () => {
    this.setState({ isLoading: true });
    const { searchItems } = this.props;
    let items;
    let categories;
    let showError = false;

    searchItems()
      .then(
        ({ items: responseItems, categories: responseCategories } = {}) => {
          items = responseItems;
          categories = responseCategories;
        }
      )
      .catch(
        () => {
          showError = true;
        }
      )
      .finally(
        () => this.setState({
          isLoading: false,
          items,
          categories,
          showError
        })
      );
  };

  handleItemSelection = (itemId) => {
    const { onItemDetailSelected } = this.props;

    onItemDetailSelected(itemId);
  };

  render() {
    const {
      isLoading,
      items,
      categories,
      showError
    } = this.state;

    if (showError) {
      return (
        <Notifications message="Ups!!! hubo un error al cargar el listado de productos" />
      );
    }

    if (isLoading) {
      return (
        <EmptyState message="Cargando productos..." />
      );
    }

    if (isEmpty(items)) {
      return (
        <EmptyState message="No hay resultados" />
      );
    }

    return (
      <div>
        <BreadCrumps crumps={categories} />
        <Items items={items} onItemSelected={this.handleItemSelection} />
      </div>
    );
  }
}
