import React, { Component } from 'react';

class Cell extends Component {
  render() {
    return (
      <div className="item" style={{'backgroundColor': this.props.color}}>
      </div>
    );
  }
}

export default Cell;
