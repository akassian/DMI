import React from 'react';
import PropTypes from 'prop-types';

import { v4 as uuid } from 'uuid';
import Ul from './Ul';
import Wrapper from './Wrapper';

function List(props) {
  const ComponentToRender = props.component;
  let content = <div />;

  // If we have items, render them
  if (props.items) {
    content = props.items.map(item => (
      /* Original code key method */
      // <ComponentToRender key={`item-${item.id}`} item={item} />
      /* Replaced with uuid */
      <ComponentToRender key={uuid()} item={item} />
    ));
  } else {
    // Otherwise render a single component
    content = <ComponentToRender />;
  }

  return (
    <Wrapper>
      <Ul>{content}</Ul>
    </Wrapper>
  );
}

List.propTypes = {
  component: PropTypes.elementType.isRequired,
  items: PropTypes.array,
};

export default List;
