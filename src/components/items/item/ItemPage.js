import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import BreadCrumps from '../../breadCrumps/BreadCrumps';
import Notifications from '../../notifications/Notification';
import Item from './Item';
import EmptyState from '../../emptyStates/EmptyState';

export default class ItemsPage extends PureComponent {
  static propTypes = {
    onLoad: PropTypes.func.isRequired
  };

  state = {
    isLoading: false,
    item: null,
    categories: [],
    showError: false
  };

  componentDidMount() {
    const { onLoad } = this.props;
    let item;
    let categories;
    let showError = false;
    this.setState({ isLoading: true });

    onLoad()
      .then(
        ({ item: responseItem, categories: responseCategories } = {}) => {
          item = responseItem;
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
          item,
          categories,
          showError
        })
      );
  }

  render() {
    const {
      isLoading,
      item,
      categories,
      showError
    } = this.state;

    if (showError) {
      return (
        <Notifications message="Ups!!! hubo un error al cargar el producto" />
      );
    }

    if (isLoading) {
      return (
        <EmptyState message="Cargando producto..." />
      );
    }

    if (isEmpty(item)) {
      return (
        <EmptyState message="No existe el producto" />
      );
    }

    return (
      <div>
        <BreadCrumps crumps={categories} />
        <Item {...item} />
      </div>
    );
  }
}
