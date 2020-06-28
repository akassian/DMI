import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import Form from './Form';
import Input from './Input';
import { makeSelectString } from './selectors';
import { addString, changeString } from './actions';
import reducer from './reducer';
import saga from './saga';

const key = 'addStringForm';
// const history = useHistory();

function AddStringForm({ string, onChangeString, onSubmitForm }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  return (
    <Form onSubmit={onSubmitForm}>
      <label htmlFor="string">String:</label>
      <Input id="string" type="text" value={string} onChange={onChangeString} />
    </Form>
  );
}

AddStringForm.propTypes = {
  onSubmitForm: PropTypes.func,
  onChangeString: PropTypes.func,
  string: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  string: makeSelectString(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeString: evt => dispatch(changeString(evt.target.value)),
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(addString());
      /* Send the client back to the home page if the form is submitted. */
      // history.push('/');
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
)(AddStringForm);
