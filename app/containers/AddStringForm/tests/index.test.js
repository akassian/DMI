/**
 * Test the AddStringForm container
 */

import React from 'react';
import { render } from 'react-testing-library';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router-dom';

import { AddStringForm, mapDispatchToProps } from '../index';
import { changeString, addString } from '../actions';
import configureStore from '../../../configureStore';

describe('<AddStringForm />', () => {
  let store;

  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  it('should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <AddStringForm
          loading={false}
          error={false}
          string=""
          onChangeString={jest.fn()}
          onSubmitString={jest.fn()}
          dispatchClearString={jest.fn()}
        />
      </Provider>,
    );
    expect(firstChild).toMatchSnapshot();
  });

  describe('mapDispatchToProps', () => {
    describe('onChangeString', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.onChangeString).toBeDefined();
      });

      it('should dispatch changeString when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        const text = 'test string';
        result.onChangeString({ target: { value: text } });
        expect(dispatch).toHaveBeenCalledWith(changeString(text));
      });
    });

    describe('onSubmitString', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.onSubmitString).toBeDefined();
      });

      it('should dispatch addString when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        result.onSubmitString();
        expect(dispatch).toHaveBeenCalledWith(addString());
      });

      it('should preventDefault if called with event', () => {
        const preventDefault = jest.fn();
        const result = mapDispatchToProps(() => {});
        const evt = { preventDefault };
        result.onSubmitString(evt);
        expect(preventDefault).toHaveBeenCalledWith();
      });
    });
  });
});
