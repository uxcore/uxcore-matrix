/**
 * Matrix Component for uxcore
 * @author eternalsky
 *
 * Copyright 2015-2016, Uxcore Team, Alinw.
 * All rights reserved.
 */
const React = require('react');
const deepcopy = require('deepcopy');
const deepEqual = require('deep-equal');
const util = require('./util');

class Matrix extends React.Component {

  constructor(props) {
    super(props);
    this.data = deepcopy(props.data);
    this.state = {
      vm: this.getVirtualMatrix(this.data),
    };
  }

  componentWillReceiveProps(nextProps) {
    const newState = {};
    let vmNeedUpdate = false;
    if (!deepEqual(this.data, nextProps.data)) {
      this.data = deepcopy(nextProps.data);
      vmNeedUpdate = true;
    }
    if (vmNeedUpdate) {
      newState.vm = this.getVirtualMatrix(this.data);
    }
    this.setState(newState);
  }

  getRealMatrix() {
    const me = this;
    const { prefixCls, cellHeight, cellWidth } = this.props;
    return this.state.vm.numData.map((item, index) => {
      const style = {
        // top: item.y * parseInt(cellHeight, 10),
        // left: item.x * parseInt(cellWidth, 10),
        // width: item.col * parseInt(cellWidth, 10),
        // height: item.row * parseInt(cellHeight, 10),
        top: util.getSubTotal(cellHeight, 0, item.y),
        left: util.getSubTotal(cellWidth, 0, item.x),
        width: util.getSubTotal(cellWidth, item.x, item.x + item.col),
        height: util.getSubTotal(cellHeight, item.y, item.y + item.row),
      };
      if (item.x === 0) {
        style.borderLeft = 'none';
      }
      if (item.y === util.getLargestArr(me.state.vm.vm).length - item.row) {
        style.borderBottom = 'none';
      }
      return (
        <div
          className={`${prefixCls}-cell`}
          key={index}
          style={style}
        >{me.props.render(item)}</div>
      );
    });
  }

  getVirtualMatrix(data) {
    if (data && data.data) {
      if (data.data instanceof Array) {
        const vm = util.generateVM(data.data);
        if (typeof vm === 'string') {
          console.error(vm);
          return [];
        }
        return vm;
      }
      console.error('Matrix: props.data.data should be an array');
      return [];
    }
    console.error('Matrix: props.data is required');
    return [];
  }

  render() {
    const me = this;
    const { prefixCls, height, width, cellWidth, cellHeight } = me.props;
    const vm = me.state.vm.vm;
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

Matrix.defaultProps = {
  prefixCls: 'kuma-matrix',
  data: {},
  cellHeight: 40,
  cellWidth: 100,
  render: (cell) => cell.text,
};


// http://facebook.github.io/react/docs/reusable-components.html
Matrix.propTypes = {
  prefixCls: React.PropTypes.string,
  className: React.PropTypes.string,
  width: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]),
  height: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]),
  cellHeight: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
    React.PropTypes.array,
  ]),
  cellWidth: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
    React.PropTypes.array,
  ]),
  render: React.PropTypes.func,
  data: React.PropTypes.object,
};

Matrix.displayName = 'Matrix';

module.exports = Matrix;
