import React, { useEffect, memo } from 'react';
// import { v4 as uuid } from 'uuid';
// import { getStrings } from '../../api/strings';
// import useApi from '../../hooks/useApi';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { fetchStrings } from './actions';
import { makeSelectStrings } from './selectors';
import Form from '../HomePage/Form';
import reducer from './reducer';
import saga from './saga';

const key = 'home';

export function Home({ strings, dispatchStrings }) {
  console.log('STRINGS in home', strings);
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  useEffect(() => {
    dispatchStrings();
  }, []);

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
  let allStrings;
  // if (strings !== undefined) {
  //   allStrings = strings.strings.map(string => <li key={uuid()}>{string}</li>);
  // }

  return (
    <>
      <h1>Strings</h1>
      <ul>{allStrings}</ul>
      <Form onSubmit={dispatchStrings}>
        <button type="submit">Submit</button>
      </Form>
    </>
  );
}

Home.propTypes = {
  strings: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  dispatchStrings: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  strings: makeSelectStrings(),
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
