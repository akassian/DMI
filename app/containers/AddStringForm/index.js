import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import Form from './Form';
// import Input from './Input';
import { makeSelectString } from './selectors';
import { addString, changeString } from './actions';
import reducer from './reducer';
import saga from './saga';

const key = 'addStringForm';

function AddStringForm({
  history,
  string,
  onChangeString,
  onSubmitString,
  onCancelString,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const onSubmitForm = evt => {
    /* Dispatches addString (POST request) */
    onSubmitString(evt);
    /* Send the client back to the home page */
    history.push('/');
  };

  const onCancelForm = () => {
    /* Clear form by dispatch - changing string to empty */
    onCancelString();
    /* Send the client back to the home page */
    history.push('/');
  };

  return (
    <Form onSubmit={onSubmitForm}>
      <div>
        <label htmlFor="string">Text:</label>
      </div>

      <textarea
        id="string"
        value={string}
        onChange={onChangeString}
        rows="4"
        cols="50"
        required
      />

      <div>
        <input type="submit" />
        <button type="button" onClick={onCancelForm}>
          Cancel
        </button>
      </div>
    </Form>
  );
}

/* Prop type validation */
AddStringForm.propTypes = {
  history: PropTypes.object,
  onSubmitString: PropTypes.func,
  onChangeString: PropTypes.func,
  onCancelString: PropTypes.func,
  string: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  string: makeSelectString(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeString: evt => dispatch(changeString(evt.target.value)),
    onSubmitString: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      /* POST request - add string to db */
      dispatch(addString());
      /* Clear form by changing string to empty */
      dispatch(changeString());
    },
    onCancelString: () =>
      /* Clear form by changing string to empty */
      dispatch(changeString()),
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
  )(AddStringForm),
);
