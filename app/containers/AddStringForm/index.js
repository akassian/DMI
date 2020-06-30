import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import List from 'components/List';
import ListItem from 'components/ListItem';
import LoadingIndicator from 'components/LoadingIndicator';
import Form from './Form';
import {
  makeSelectString,
  makeSelectLoading,
  makeSelectError,
} from './selectors';
import { addString, changeString } from './actions';
import reducer from './reducer';
import saga from './saga';

const key = 'addStringForm';

export function AddStringForm({
  history,
  string,
  loading,
  error,
  onChangeString,
  onSubmitString,
  dispatchClearString,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  /* Local state for keeping track of user attempt to submit
  - for submission logic */
  const [submitted, setSubmitted] = useState(false);

  /* Alert message container */
  const [alert, setAlert] = useState(null);

  /* Submission logic for displaying loading, error, or redirecting */
  useEffect(() => {
    if (submitted) {
      /* Loading case */
      if (loading === true) {
        setAlert(<List component={LoadingIndicator} />);
      }

      /* Error case */
      if (error !== false) {
        /* Reset submitted to allow attempting a resubmit */
        setSubmitted(false);
        const ErrorComponent = () => (
          <ListItem
            item={`${error.message} - Something went wrong, please try again!`}
          />
        );
        setAlert(<List component={ErrorComponent} />);
      }

      /* POST Success - redirect case */
      if (error === false && loading === false) {
        setSubmitted(false);
        /* Clear form by changing string to empty */
        dispatchClearString();
        history.push('/');
      }
    }
  }, [submitted, error, loading]);

  const onSubmitForm = evt => {
    /* Dispatches addString (POST request) */
    onSubmitString(evt);
    /* Go to submission logic useEffect */
    setSubmitted(true);
  };

  const onCancelForm = () => {
    setSubmitted(false);
    /* Clear form by dispatch - changing string to empty */
    dispatchClearString();
    /* Send the client back to the home page */
    history.push('/');
  };

  return (
    <>
      {alert}
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
    </>
  );
}

/* Prop type validation */
AddStringForm.propTypes = {
  history: PropTypes.object,
  string: PropTypes.string,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  onSubmitString: PropTypes.func,
  onChangeString: PropTypes.func,
  dispatchClearString: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  string: makeSelectString(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeString: evt => dispatch(changeString(evt.target.value)),
    onSubmitString: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      /* POST request - add string to db */
      dispatch(addString());
    },
    dispatchClearString: () =>
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
