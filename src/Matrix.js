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
    if (!deepEqual(this.data, nextProps.data)) {
      this.data = deepcopy(nextProps.data);
      newState.vm = this.getVirtualMatrix(this.data);
    }
    this.setState(newState);
  }

  // getRealMatrix() {
  //   console.log(this.state.data);
  //   return (
  //     <table>
  //       <tbody>
  //       {this.state.data.map((item, i) =>
  //         <tr key={i}>
  //           {item.map((cell, j) =>
  //             <td key={j} rowSpan={cell.row} colSpan={cell.col}>{cell.text}</td>
  //           )}
  //         </tr>
  //       )}
  //       </tbody>
  //     </table>
  //   );
  // }

  getRealMatrix() {
    const { prefixCls, cellHeight, cellWidth } = this.props;
    return this.state.vm.numData.map((item, index) =>
      <div
        className={`${prefixCls}-cell`}
        key={index}
        style={{
          top: item.y * parseInt(cellHeight, 10),
          left: item.x * parseInt(cellWidth, 10),
          width: item.col * parseInt(cellWidth, 10),
          height: item.row * parseInt(cellHeight, 10),
        }}
      >{item.text}</div>
    );
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
    return (
      <div
        className={`${prefixCls}`}
        style={{
          height: height || (vm[0].length * parseInt(cellHeight, 10)),
          width: width || (vm.length * parseInt(cellWidth, 10)),
        }}
      >
        {this.getRealMatrix()}
      </div>
    );
  }
}

Matrix.defaultProps = {
  prefixCls: 'kuma-matrix',
  data: {},
  cellHeight: 30,
  cellWidth: 100,
};


// http://facebook.github.io/react/docs/reusable-components.html
Matrix.propTypes = {
  prefixCls: React.PropTypes.string,
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
  ]),
  cellWidth: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]),
  data: React.PropTypes.object,
};

Matrix.displayName = 'Matrix';

module.exports = Matrix;
