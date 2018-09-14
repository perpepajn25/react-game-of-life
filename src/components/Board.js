import React, { Component } from 'react';
import Cell from './Cell'

class Board extends Component {

  constructor (props) {
    super(props)
    const dimension = 25
    this.state = {
      dimension,
      cells: this.generateBoard(dimension),
      generations: 0
    }
  }

  componentDidMount(){
    setTimeout(this.generateNewBoard, 1000)
  }

  generateBoard = (dimension) => {
    let array = []
    array.length = dimension*dimension
    return array.fill(0).map(() => Math.round(Math.random()))
  }

  generateNewBoard = () => {
    this.setState((prevState)=>{
      const newCells = prevState.cells.map(this.getCellStatus)
      return {
        cells: newCells,
        generations: prevState.generations + 1
      }
    })
  }

  getCellStatus = (currentStatus, index, cells) => {
      let cellPosition = index+1
      let top, bottom, rightSide, leftSide
      // find cell orientation
      if (cellPosition <= this.state.dimension){
        top = true
      } else if (cellPosition % this.state.dimension === 1) {
        leftSide = true
      } else if (cellPosition % this.state.dimension === 0) {
        rightSide = true
      } else if (cellPosition >= (this.state.cells.length - this.state.dimension)) {
        bottom = true
      }

      // find neighbor count

  }


  generateCells = () => {
    return this.state.cells.map((value) => {
      return <Cell color={value === 0 ? '#666666':'#ffc000'}/>
    })
  }

  render() {
    const styles = {
      gridTemplateColumns:`repeat(${this.state.dimension},${100/this.state.dimension}%)`,
      gridTemplateRows:`repeat(${this.state.dimension},${100/this.state.dimension}%)`,
    }
    return (
      <div className="container" style={styles}>
        {this.generateCells()}
      </div>
    );
  }
}

export default Board;
