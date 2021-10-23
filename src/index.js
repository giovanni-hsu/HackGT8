import { div } from 'prelude-ls';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import GameGrid from './GameLogic.js';

const blockDict = {
  1: {
    'material' : 'stone',
  },
  0: {
    'material' : 'empty',
  },
  2: {
    'material' : 'water',
  },
  3: {
    'material' : 'water',
  },

};

class Square extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      material: blockDict[props.grid.getIndex(props.x, props.y)].material,
    };
  }

  render() {
    return (
      <button className={"square"} onClick={() => {
        this.props.grid.placeStone(this.props.x, this.props.y); 
        this.setState({material: this.state.material !== 'stone' ? 'stone' : 'empty'})}
        }>
        <div className={"material " + blockDict[this.props.grid.getIndex(this.props.x, this.props.y)].material}></div>
      </button>
    );
  }
}
  
class Board extends React.Component {
    renderSquare(material, x, y) {
      return <Square x={x} y={y} grid={this.props.grid}/>;
    }

    renderInitGrid(width, height) {
      const grid = [];
      for (let row = 0; row < width; row++) {
        const currentRow = [];
        for (let col = 0; col < height; col++) {
          currentRow.push(blockDict[0]);
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
      console.log("Renders");

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
      this.waterInterval = null;
      this.state = {
        grid: new GameGrid(props.size),
        waterStart: props.waterStart,
        waterEnd: props.waterEnd,
      }
      
    }

    startWater() {
      console.log(this.state);
      this.state.grid.placeWater(this.state.waterStart.x, this.state.waterStart.y);
      this.waterInterval = setInterval(() => {this.updateWater(this)}, 700);
    }

    updateWater(game) {
      game.state.grid.updateGrid();
      game.setState({grid: game.state.grid});
      if (game.state.grid.done()) {
        clearInterval(game.waterInterval);
      }
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
  