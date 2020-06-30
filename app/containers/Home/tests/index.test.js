/**
 * Test the Home container
 */

import React from 'react';
import { render } from 'react-testing-library';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router-dom';

import { Home, mapDispatchToProps } from '../index';
import { fetchStrings } from '../actions';
import configureStore from '../../../configureStore';

describe('<Home />', () => {
  let store;

  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  it('should render and match the snapshot', () => {
    const mockedDispatchFetchStrings = jest.fn();
    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <Home
          loading={false}
          error={false}
          strings={false}
          dispatchFetchStrings={mockedDispatchFetchStrings}
        />
      </Provider>,
    );
    expect(firstChild).toMatchSnapshot();
  });

  it('should fetch the strings on mount', () => {
    const mockedDispatchFetchStrings = jest.fn();
    render(
      <Provider store={store}>
        <Home
          loading={false}
          error={false}
          strings={false}
          dispatchFetchStrings={mockedDispatchFetchStrings}
        />
      </Provider>,
    );
    expect(mockedDispatchFetchStrings).toHaveBeenCalled();
  });

  describe('mapDispatchToProps', () => {
    describe('dispatchFetchStrings', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.dispatchFetchStrings).toBeDefined();
      });

      it('should dispatch changeUsername when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        result.dispatchFetchStrings();
        expect(dispatch).toHaveBeenCalledWith(fetchStrings());
      });

      it('should preventDefault if called with event', () => {
        const preventDefault = jest.fn();
        const result = mapDispatchToProps(() => {});
        const evt = { preventDefault };
        result.dispatchFetchStrings(evt);
        expect(preventDefault).toHaveBeenCalledWith();
      });
    });
  });
});
