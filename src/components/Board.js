import React, { Component } from 'react';
import Cell from './Cell'

class Board extends Component {

  constructor (props) {
    super(props)
    const dimension = 50
    this.state = {
      dimension,
      cells: this.generateBoard(dimension),
      generations: 0
    }
  }

  componentDidMount(){
    setInterval(this.generateNewBoard, 1000)
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
    const orientation = this.findCellOrientation(index, cells)
    const liveNeighbors = this.findLiveNeighbors(orientation,index,cells)
    if (currentStatus === 1 && (liveNeighbors === 2 || liveNeighbors === 3)) {
      return 1
    } else if (currentStatus===0 && liveNeighbors===3){
      return 1
    } else {
      return 0
    }
  }

  findCellOrientation = (indexValue, array) => {
    let cellPosition = indexValue+1
    let orientation = {}

    if (cellPosition <= this.state.dimension){
      orientation.missingTop = true
    }
    if (cellPosition % this.state.dimension === 1) {
      orientation.missingLeftSide = true
    }
    if (cellPosition % this.state.dimension === 0) {
      orientation.missingRightSide = true
    }
    if (cellPosition >= (array.length - this.state.dimension + 1 )) {
      orientation.missingBottom = true
    }
    return orientation
  }

  findLiveNeighbors = (orientationObj,indexValue, cellsArray) => {
    let liveNeighbors = 0

    !orientationObj.missingTop && (liveNeighbors += cellsArray[indexValue-this.state.dimension])
    !orientationObj.missingBottom && (liveNeighbors += cellsArray[indexValue+this.state.dimension])
    !orientationObj.missingRightSide && (liveNeighbors += cellsArray[indexValue+1])
    !orientationObj.missingLeftSide && (liveNeighbors += cellsArray[indexValue-1])
    if (!orientationObj.missingLeftSide && !orientationObj.missingBottom) {
      liveNeighbors += cellsArray[indexValue+this.state.dimension-1]
    }
    if (!orientationObj.missingLeftSide && !orientationObj.missingTop){
      liveNeighbors += cellsArray[indexValue-this.state.dimension-1]
    }
    if (!orientationObj.missingRightSide && !orientationObj.missingBottom) {
      liveNeighbors += cellsArray[indexValue+this.state.dimension+1]
    }
    if (!orientationObj.missingRightSide && !orientationObj.missingTop){
      liveNeighbors += cellsArray[indexValue-this.state.dimension+1]
    }
    return liveNeighbors
  }


  generateCells = () => {
    return this.state.cells.map((value) => {
      return <Cell color={value === 0 ? '#666666':'#ffc000'}/>
    })
  }

  render() {
    console.log(this.state.cells)
    const styles = {
      gridTemplateColumns:`repeat(${this.state.dimension},${100/this.state.dimension}%)`,
      gridTemplateRows:`repeat(${this.state.dimension},${100/this.state.dimension}%)`,
    }
    return (
      <div className="container" style={styles}>
        {this.generateCells()}
        <ul>
        <li> Generations: {this.state.generations} </li>
        <li> Population: {this.state.cells.reduce((a, b) => a + b, 0)} </li>
      </ul>
      </div>
    );
  }
}

export default Board;
