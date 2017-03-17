import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Query from '../client/app/components/query.jsx';

describe('<Query />', () => {

  it ('renders a button component', () => {
    const wrapper = shallow(<Query />);
    expect(wrapper.find('button')).to.have.length(1);
  })

  it ('renders two option components', () => {
    const wrapper = shallow(<Query />);
    expect(wrapper.find('option')).to.have.length(2);
  })


})