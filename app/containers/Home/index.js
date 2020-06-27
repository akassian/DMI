import React, { useEffect, memo } from 'react';
import { v4 as uuid } from 'uuid';
// import { getStrings } from '../../api/strings';
// import useApi from '../../hooks/useApi';
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
import Form from '../HomePage/Form';
import reducer from './reducer';
import saga from './saga';

const key = 'home';

export function Home({ strings, loading, error, dispatchStrings }) {
  console.log('STRINGS in home', strings);
  console.log('loading in home', loading);
  console.log('error in home', error);
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  useEffect(() => {
    dispatchStrings();
  }, []);

  let allStrings;
  if (loading) {
    allStrings = <List component={LoadingIndicator} />;
  }

  if (error !== false) {
    const ErrorComponent = () => (
      <ListItem item="Something went wrong, please try again!" />
    );
    allStrings = <List component={ErrorComponent} />;
  }

  // const [isLoading, errors, data] = useApi(getStrings);
  // console.log(isLoading, errors, data);

  // const [data, setData] = useState(null);
  // useEffect(() => {
  //   const getData = async () => {
  //     const res = await getStrings();
  //     console.log(res);
  //     setData(res);
  //   };
  //   getData();
  // }, []);

  // if (isLoading) return <h1>Loading...</h1>;

  // const allStrings = data.strings.map(string => <li key={uuid()}>{string}</li>);
  // if (strings !== false) {
  //   allStrings = strings.map(string => <li key={uuid()}>{string}</li>);
  // }

  if (strings !== false) {
    allStrings = <List items={strings} component={ListItem} />;
  }

  return (
    <>
      <h1>Strings</h1>
      {allStrings}
      <Form onSubmit={dispatchStrings}>
        <button type="submit">Submit</button>
      </Form>
    </>
  );
}

Home.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  strings: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  dispatchStrings: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  strings: makeSelectStrings(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    dispatchStrings: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      console.log('inside dispatchStrings');
      dispatch(fetchStrings());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Home);
