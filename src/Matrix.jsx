/**
 * Matrix Component for uxcore
 * @author eternalsky
 *
 * Copyright 2015-2016, Uxcore Team, Alinw.
 * All rights reserved.
 */
import React from 'react';
import PropTypes from 'prop-types';
import deepEqual from 'lodash/isEqual';
import { polyfill } from 'react-lifecycles-compat';
import util from './util';

const errorInfo = (<div className="error" style={{ color: '#f00' }}>
  数据错误，请检查 data 属性格式是否正确！
</div>);

class Matrix extends React.Component {
  static displayName = 'Matrix';

  static propTypes = {
    prefixCls: PropTypes.string,
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
    height: undefined,
    width: undefined,
    cellHeight: 50,
    cellWidth: 100,
    render: cell => cell.text,
  };

  static getVirtualMatrix(data) {
    if (data && data.data) {
      if (data.data instanceof Array) {
        const vm = util.generateVM(data.data);
        if (typeof vm === 'string') {
          return null;
        }
        return vm;
      }

      return null;
    }

    return null;
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!deepEqual(prevState.data, nextProps.data)) {
      return {
        data: nextProps.data,
        vm: Matrix.getVirtualMatrix(nextProps.data),
      };
    }

    // Return null to indicate no change to state.
    return null;
  }

  constructor(props) {
    super(props);

    this.state = {
      data: props.data,
      vm: Matrix.getVirtualMatrix(props.data),
    };
  }

  getRealMatrix() {
    const { prefixCls, cellHeight, cellWidth } = this.props;
    if (!this.state.vm) {
      return errorInfo;
    }

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

  render() {
    const { prefixCls, height, width, cellWidth, cellHeight } = this.props;
    if (!this.state.vm) {
      return errorInfo;
    }

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

// Polyfill your component so the new lifecycles will work with older versions of React
polyfill(Matrix);

export default Matrix;
