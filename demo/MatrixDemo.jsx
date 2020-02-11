/**
 * Matrix Component Demo for uxcore
 * @author eternalsky
 *
 * Copyright 2015-2016, Uxcore Team, Alinw.
 * All rights reserved.
 */

const React = require('react');
const Matrix = require('../src');
const data = require('./data');

const data2 = {
  data: [
    { x: 0, y: 0, row: 1, col: 1, type: 'title',  text: '订单编号' },
    { x: 1, y: 0, row: 1, col: 1, type: 'normal', text: '600,000.00(CNY)' },
    { x: 2, y: 0, row: 1, col: 1, type: 'title', text: '申请单号' },
    { x: 3, y: 0, row: 1, col: 1, type: 'normal', text: '123123' },
    { x: 4, y: 0, row: 1, col: 1, type: 'title', text: '报价单号' },
    { x: 5, y: 0, row: 1, col: 1, type: 'normal', text: '1234' },
    { x: 6, y: 0, row: 1, col: 1, type: 'title', text: '合同号' },
    { x: 7, y: 0, row: 1, col: 1, type: 'normal', text: '378467251864' },
    { x: 8, y: 0, row: 1, col: 1, type: 'normal', text: '378467251864' },
    { x: 9, y: 0, row: 1, col: 1, type: 'normal', text: '378467251864' },
    { x: 10, y: 0, row: 1, col: 1, type: 'normal', text: '378467251864' },
    { x: 11, y: 0, row: 1, col: 1, type: 'normal', text: '378467251864' },
    { x: 12, y: 0, row: 1, col: 1, type: 'normal', text: '378467251864' },
    { x: 0, y: 1, row: 1, col: 1, type: 'title', text: '订单状态' },
    { x: 1, y: 1, row: 1, col: 1, type: 'normal', text: '已生效' },
    { x: 2, y: 1, row: 1, col: 1, type: 'title', text: '订单金额' },
    { x: 3, y: 1, row: 1, col: 1, type: 'normal', text: '12654300' },
    { x: 4, y: 1, row: 1, col: 1, type: 'title', text: '收款公司' },
    { x: 5, y: 1, row: 1, col: 1, type: 'normal', text: '阿里巴巴' },
    { x: 6, y: 1, row: 1, col: 1, type: 'title', text: '供应商' },
    { x: 7, y: 1, row: 1, col: 1, type: 'normal', text: '扒拉扒拉童装' },
    { x: 8, y: 1, row: 1, col: 1, type: 'normal', text: '扒拉扒拉童装' },
    { x: 9, y: 1, row: 1, col: 1, type: 'normal', text: '扒拉扒拉童装' },
    { x: 10, y: 1, row: 1, col: 1, type: 'normal', text: '扒拉扒拉童装' },
    { x: 11, y: 1, row: 1, col: 1, type: 'normal', text: '扒拉扒拉童装' },
    { x: 12, y: 1, row: 1, col: 1, type: 'normal', text: '扒拉扒拉童装' },
    { x: 0, y: 2, row: 1, col: 1, type: 'title', text: '已付总金额' },
    { x: 1, y: 2, row: 1, col: 1, type: 'normal', text: '600,000.00(CNY)' },
    { x: 2, y: 2, row: 1, col: 1, type: 'title', text: '已收款总金额' },
    { x: 3, y: 2, row: 1, col: 1, type: 'normal', text: '123123' },
    { x: 4, y: 2, row: 1, col: 1, type: 'title', text: '开票信息' },
    { x: 5, y: 2, row: 1, col: 3, type: 'link', text: '开票信息可点击' },
    { x: 8, y: 2, row: 1, col: 1, type: 'link', text: '开票信息可点击' },
    { x: 9, y: 2, row: 1, col: 1, type: 'link', text: '开票信息可点击' },
    { x: 10, y: 2, row: 1, col: 1, type: 'link', text: '开票信息可点击' },
    { x: 11, y: 2, row: 1, col: 1, type: 'link', text: '开票信息可点击' },
    { x: 12, y: 2, row: 1, col: 1, type: 'link', text: '开票信息可点击' },
    { x: 0, y: 3, row: 1, col: 1, type: 'title', text: '备注' },
    { x: 1, y: 3, row: 1, col: 7, type: 'normal', text: '吧啦的哈佛哈开的奶茶啊我会成为啊' },
  ],
};

const data3 = {
  data: [
    { x: 0, y: 0, row: 2, col: 5, type: 'title', text: '订单编号' },
    { x: 5, y: 0, row: 1, col: 3, type: 'normal', text: '600,000.00(CNY)' },
    // { x: 0, y: 2, row: 1, col: 1, type: 'title', text: '申请单号' },
    // { x: 3, y: 0, row: 1, col: 1, type: 'normal', text: '123123' },
    // { x: 4, y: 0, row: 1, col: 1, type: 'title', text: '报价单号' },
    // { x: 5, y: 0, row: 1, col: 3, type: 'normal', text: '1234' },
    // { x: 0, y: 1, row: 1, col: 1, type: 'title', text: '订单状态' },
    // { x: 1, y: 1, row: 1, col: 1, type: 'normal', text: '已生效' },
    // { x: 2, y: 1, row: 1, col: 1, type: 'title', text: '订单金额' },
    // { x: 3, y: 1, row: 1, col: 1, type: 'normal', text: '12654300' },
    // { x: 4, y: 1, row: 1, col: 1, type: 'title', text: '收款公司' },
    { x: 5, y: 1, row: 1, col: 1, type: 'normal', text: '阿里巴巴' },
    { x: 6, y: 1, row: 1, col: 1, type: 'title', text: '供应商' },
    { x: 7, y: 1, row: 1, col: 1, type: 'normal', text: '扒拉扒拉童装' },
    { x: 0, y: 2, row: 1, col: 1, type: 'title', text: '已付总金额' },
    { x: 1, y: 2, row: 1, col: 1, type: 'normal', text: '600,000.00(CNY)' },
    { x: 2, y: 2, row: 1, col: 1, type: 'title', text: '已收款总金额' },
    { x: 3, y: 2, row: 1, col: 1, type: 'normal', text: '123123' },
    { x: 4, y: 2, row: 1, col: 1, type: 'title', text: '开票信息' },
    { x: 5, y: 2, row: 1, col: 3, type: 'link', text: '开票信息可点击' },
    { x: 0, y: 3, row: 1, col: 1, type: 'title', text: '备注' },
    { x: 1, y: 3, row: 1, col: 7, type: 'normal', text: '吧啦的哈佛哈开的奶茶啊我会成为啊' },
  ],
};

class Demo extends React.Component {
  static customRender(cellData) {
    const style = {
      lineHeight: '40px',
      textAlign: 'left',
      padding: '0 20px',
      overflow: 'hidden',
    };
    if (cellData.type === 'title') {
      style.textAlign = 'right';
      style.color = 'rgba(0, 0, 0, 0.8)';
      style.fontWeight = 'bold';
      // style.background = '#ddd';
    }
    let content = cellData.text;
    if (cellData.type === 'link') {
      content = <a>{content}</a>;
    }
    return (
      <div style={style}>
        {content}
      </div>
    );
  }

  constructor(props) {
    super(props);

    this.state = {
      matrix2Data: data2,
    };

    this.changeData = this.changeData.bind(this);
  }

  changeData() {
    this.setState({
      matrix2Data: data3,
    });
  }

  render() {
    return (
      <div
        style={{
          paddingLeft: 20,
          paddingTop: 20,
        }}
      >
        <h2>基本</h2>
        <Matrix
          data={data}
          cellHeight={[100, 50, 50]}
          cellWidth={[100, 200, 300, 100, 100]}
          width={810}
        />
        <h2>首列固定</h2>
        <button onClick={this.changeData}>修改数据重新布局</button>
        <Matrix
          data={this.state.matrix2Data}
          cellWidth={120}
          cellHeight={40}
          render={Demo.customRender}
          fixFirstRow={true}
          maxHeight={122}
          // fixFirstColumn={true}
          // maxWidth={800}
          // fixedColumnBackground={'#aaa'}
        />
        <h2>首行固定</h2>
        <Matrix
          data={data3}
          cellWidth={120}
          cellHeight={40}
          render={Demo.customRender}
          fixFirstRow={true}
          maxHeight={122}
        />
      </div>
    );
  }
}

module.exports = Demo;
