/* eslint-disable react/jsx-filename-extension */
import expect from 'expect.js';
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import Matrix from '../src';

Enzyme.configure({ adapter: new Adapter() });

const data1 = {
  data: [
    { x: 0, y: 0, row: 2, col: 2, text: '1' },
    { x: 2, y: 0, row: 2, col: 2, text: '2' },
    { x: 4, y: 0, row: 3, col: 1, text: '3' },
    { x: 0, y: 2, row: 1, col: 3, text: '4' },
  ],
};

const data2 = {
  data: [
    { x: 0, y: 0, row: 2, col: 2, text: '1' },
    { x: 2, y: 0, row: 2, col: 2, text: '2' },
    { x: 4, y: 0, row: 3, col: 1, text: '3' },
    { x: 0, y: 2, row: 1, col: 3, text: '4' },
    { x: 3, y: 2, row: 1, col: 1, text: '5' },
    { x: 5, y: 2, row: 3, col: 1, text: '6' },
  ],
};

const data3 = {
  data: [
    { x: 0, y: 0, row: 1, col: 1, text: '1' },
    { x: 0, y: 0, row: 1, col: 1, text: '2' },
    { x: 0, y: 0, row: 1, col: 1, text: '3' },
  ],
};

const render = (data, others = {}) => {
  const wrapper = mount(
    <Matrix
      data={data}
      {...others}
    />,
  );

  return wrapper;
};

describe('Matrix', () => {
  const matrix = render(data1);
  it('shoud render with right outer structure', () => {
    expect(matrix.find('.kuma-matrix').exists()).to.be(true);
    expect(matrix.find('.kuma-matrix-wrap').exists()).to.be(true);
  });
  it('should render 5 cells', () => {
    expect(matrix.find('.kuma-matrix-cell').length).to.be(4);
  });
  it('should responed with data change', () => {
    matrix.setProps({ data: data2 });
    expect(matrix.find('.kuma-matrix-cell').length).to.be(6);
  });

  const matrix2 = render(data1, {
    cellHeight: [50, 50, 50, 50],
  });
  it('should render with defined cell height', () => {
    expect(matrix2.find('.kuma-matrix').exists()).to.be(true);
    expect(matrix2.find('.kuma-matrix-wrap').exists()).to.be(true);
  });

  it('should throw error if data.data is not an array', () => {
    try {
      render({ data: 1 });
    } catch (e) {
      expect(e.message.indexOf('should be an array') !== -1).to.be(true);
    }
  });

  it('should throw error if props data is not valid', () => {
    try {
      render(null);
    } catch (e) {
      expect(e.message.indexOf('is required') !== -1).to.be(true);
    }
  });

  it('should throw error if cell data is conflicted', () => {
    try {
      render(data3);
    } catch (e) {
      expect(e.message.indexOf('Conflict detect') !== -1).to.be(true);
    }
  });
});
