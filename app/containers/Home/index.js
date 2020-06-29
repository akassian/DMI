import React, { useEffect, memo } from 'react';
// import { getStrings } from '../../api/strings';
// import useApi from '../../hooks/useApi';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import List from 'components/List';
import ListItem from 'components/ListItem';
import LoadingIndicator from 'components/LoadingIndicator';
import {
  makeSelectStrings,
  makeSelectLoading,
  makeSelectError,
} from './selectors';
import { fetchStrings } from './actions';
import reducer from './reducer';
import saga from './saga';

const key = 'home';

export function Home({
  history,
  strings,
  loading,
  error,
  dispatchFetchStrings,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  /* Fetch Strings on load - dispatch saga */
  useEffect(() => {
    dispatchFetchStrings();
  }, []);

  /* Strings container */
  let allStrings = null;

  /* Loading indicator for fetching Strings - shown in Strings container */
  if (loading) {
    allStrings = <List component={LoadingIndicator} />;
  }

  /* Error msg for fetching Strings - shown in Strings container */
  if (error !== false) {
    const ErrorComponent = () => (
      <ListItem
        item={`${error.message} - Something went wrong, please try again!`}
      />
    );
    allStrings = (
      <>
        <List component={ErrorComponent} />
        <button type="button" onClick={dispatchFetchStrings}>
          Refresh
        </button>
      </>
    );
  }

  /* Load fetched strings into allStrings container */
  if (strings !== false) {
    allStrings = <List items={strings} component={ListItem} />;
  }

  return (
    <>
      <h1>Strings</h1>

      {/* Button to refresh - not really needed but uncomment if desired */}

      {/* <button type="button" onClick={dispatchFetchStrings}>
        Refresh
      </button> */}

      <button type="button" onClick={() => history.push('/new')}>
        Add
      </button>

      {allStrings}
    </>
  );
}

/* Prop type validation */
Home.propTypes = {
  history: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  strings: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  dispatchFetchStrings: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  strings: makeSelectStrings(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    dispatchFetchStrings: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(fetchStrings());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRouter(
  compose(
    withConnect,
    memo,
  )(Home),
);
