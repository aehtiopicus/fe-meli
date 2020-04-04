import { connect } from 'react-redux';

import { push } from 'react-router-redux';
import { join } from '../utils';


import ItemsPage from '../components/items/ItemsPage';
import { getItems } from '../actions/items';
import { BASE_URL, ITEM_PATH } from '../routes/constants';

const mapStateToProps = (
  _,
  {
    location: {
      query: {
        search
      } = {}
    } = {}
  }
) => ({
  search
});

const mapDispatchToProps = (
  dispatch,
  {
    location: {
      query: {
        search
      } = {}
    } = {}
  }
) => ({
  searchItems: () => dispatch(getItems(search)),
  onItemDetailSelected: (itemId) => dispatch(
    push(
      join(BASE_URL, ITEM_PATH, itemId)
    )
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemsPage);
