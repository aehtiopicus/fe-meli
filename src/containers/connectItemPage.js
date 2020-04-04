import { connect } from 'react-redux';

import Item from '../components/items/item/ItemPage';
import { getItem } from '../actions/items';

const mapDispatchToProps = (
  dispatch,
  {
    params: {
      id
    }
  }
) => ({
  onLoad: () => dispatch(getItem(id))
});

export default connect(null, mapDispatchToProps)(Item);
