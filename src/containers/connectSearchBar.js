import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { push } from 'react-router-redux';
import flowRight from 'lodash/flowRight';

import SearchBar from '../components/search/SearchBar';
import { ITEM_PATH } from '../routes/constants';

const mapStateToProps = (
  {
    routing: {
      locationBeforeTransitions: {
        query: {
          search
        } = {}
      } = {}
    } = {}
  }
) => ({
  search
});

const mapDispatchToProps = (dispatch) => ({
  handleSubmit: (value) => dispatch(
    push(`/${ITEM_PATH}?search=${value}`)
  )
});

export default flowRight(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(SearchBar);
