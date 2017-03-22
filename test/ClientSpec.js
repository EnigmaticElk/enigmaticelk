import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Query from '../client/app/components/query.jsx';
import Gmap from '../client/app/components/gmap.jsx';
import Directions from '../client/app/components/directions.jsx';

describe('<Query />', () => {

  it ('renders a button component', () => {
    const wrapper = shallow(<Query />);
    expect(wrapper.find('button')).to.have.length(1);
  });

  it ('renders an origin input', () => {
    const wrapper = shallow(<Query />);
    expect(wrapper.find('#origin-input')).to.have.length(1);
  });

  it ('renders a destination input', () => {
    const wrapper = shallow(<Query />);
    expect(wrapper.find('#dest-input')).to.have.length(1);
  });

  xit ('renders two option components', () => {
    const wrapper = shallow(<Query />);
    expect(wrapper.find('option')).to.have.length(2);
  });

});

describe('<Gmap />', () => {

  it ('renders a div with a map class', () => {
    const wrapper = shallow(<Gmap />);
    expect(wrapper.find('div')).to.have.length(1);
    expect(wrapper.find('.map')).to.have.length(1);
  });

});

describe('<Directions />', () => {

  it ('renders a div with a directionsPanel id', () => {
    const wrapper = shallow(<Directions />);
    expect(wrapper.find('div')).to.have.length(1);
    expect(wrapper.find('#directionsPanel')).to.have.length(1);
  });

});