/**
 * Matrix Component for uxcore
 * @author eternalsky
 *
 * Copyright 2015-2016, Uxcore Team, Alinw.
 * All rights reserved.
 */
import React from 'react';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash.clonedeep';
import deepEqual from 'deep-equal';
import util from './util';

class Matrix extends React.Component {
  static displayName = 'Matrix';

  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    width: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    height: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    cellHeight: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.array,
    ]),
    cellWidth: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.array,
    ]),
    render: PropTypes.func,
    data: PropTypes.object,
  };

  static defaultProps = {
    prefixCls: 'kuma-matrix',
    data: {},
    cellHeight: 50,
    cellWidth: 100,
    render: (cell) => cell.text,
  };

  constructor(props) {
    super(props);

    this.data = cloneDeep(props.data);
    this.state = {
      vm: this.getVirtualMatrix(this.data),
    };
  }

  componentWillReceiveProps(nextProps) {
    const newState = {};
    let vmNeedUpdate = false;
    if (!deepEqual(this.data, nextProps.data)) {
      this.data = cloneDeep(nextProps.data);
      vmNeedUpdate = true;
    }
    if (vmNeedUpdate) {
      newState.vm = this.getVirtualMatrix(this.data);
    }
    this.setState(newState);
  }

  getRealMatrix() {
    const { prefixCls, cellHeight, cellWidth } = this.props;
    return this.state.vm.numData.map((item, index) => {
      const style = {
        top: util.getSubTotal(cellHeight, 0, item.y),
        left: util.getSubTotal(cellWidth, 0, item.x),
        width: util.getSubTotal(cellWidth, item.x, item.x + item.col),
        height: util.getSubTotal(cellHeight, item.y, item.y + item.row),
      };
      if (item.x === 0) {
        style.borderLeft = 'none';
      }
      if (item.y === util.getLargestArr(this.state.vm.vm).length - item.row) {
        style.borderBottom = 'none';
      }
      return (
        <div
          className={`${prefixCls}-cell`}
          key={index}
          style={style}
        >{this.props.render(item, style)}</div>
      );
    });
  }

  getVirtualMatrix(data) {
    if (data && data.data) {
      if (data.data instanceof Array) {
        const vm = util.generateVM(data.data);
        if (typeof vm === 'string') {
          throw new Error(vm);
        }
        return vm;
      }
      throw new Error('Matrix: props.data.data should be an array');
    }
    throw new Error('Matrix: props.data is required');
  }

  render() {
    const { prefixCls, height, width, cellWidth, cellHeight } = this.props;
    const vm = this.state.vm.vm;
    const matrixHeight = util.getSubTotal(cellHeight, 0, util.getLargestArr(vm).length);
    const matrixWidth = util.getSubTotal(cellWidth, 0, vm.length);
    return (
      <div
        className={`${prefixCls}`}
        style={{
          height: height || matrixHeight + 2,
          width: width || matrixWidth + 2,
        }}
      >
        <div
          className={`${prefixCls}-wrap`}
          style={{
            height: matrixHeight,
            width: matrixWidth,
          }}
        >
          {this.getRealMatrix()}
        </div>
      </div>
    );
  }
}

export default Matrix;
