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

class Demo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div style={{
        paddingLeft: 20,
        paddingTop: 20,
      }}>
        <Matrix data={data} />
      </div>
    );
  }
}

module.exports = Demo;
