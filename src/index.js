import { div } from 'prelude-ls';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import GameGrid from './GameLogic.js';

const blockDict = {
  'stone': {
    'material' : 'stone',
  },
  'empty': {
    'material' : 'empty',
  },
  'water': {
    'material' : 'water',
  },

};

class Square extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      material: props.material,
    };
  }

  render() {
    console.log(this.props.material);
    return (
      <button className={"square"} onClick={() => {
        this.props.grid.placeStone(this.props.x, this.props.y); 
        this.setState({material: this.state.material !== 'stone' ? 'stone' : 'empty'})}
        }>
        <div className={"material " + this.state.material}></div>
      </button>
    );
  }
}
  
class Board extends React.Component {
    renderSquare(material, x, y) {
      return <Square material={material} x={x} y={y} grid={this.props.grid}/>;
    }

    renderInitGrid(width, height) {
      const grid = [];
      for (let row = 0; row < width; row++) {
        const currentRow = [];
        for (let col = 0; col < height; col++) {
          currentRow.push(blockDict['empty']);
        }
          grid.push(currentRow);
      }
      let columnIndex = -1;
      let rowIndex = -1;
      return grid.map((row) => {
        columnIndex++;
        rowIndex = -1;
        return (
          <div className="board-row" key={columnIndex}>
              {row.map((block) => {
                rowIndex++;
                return (
                  this.renderSquare(block.material, rowIndex, columnIndex)
                );
              })}
          </div>
        )
      });

    }

    render() {
      const status = 'Poggers';
      const renderedGrid = this.renderInitGrid(8, 8);
      console.log(renderedGrid);

      return (
        <div>
          <div className="status">{status}</div>

          {renderedGrid}
        </div>
      );
    }
  }
  
  class Game extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        grid: new GameGrid(props.size),
        waterStart: props.waterStart,
        waterEnd: props.waterEnd,
      }
      
    }

    startWater() {
      console.log(this.state);
      this.state.grid.placeWater(this.state.waterStart.x, this.state.waterStart.y);
      while(!this.state.grid.done()) {
        setTimeout(() => {  this.updateWater(); }, 2000);
      }
    }

    updateWater() {
      this.state.grid.updateGrid();
      this.setState({grid: this.state.grid});
    }

    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board grid={this.state.grid}/>
          </div>
          <button onClick={() => {this.startWater()}}>Start water</button>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game size={8} waterStart={{x:0,y:0}}/>,
    document.getElementById('root')
  );
  