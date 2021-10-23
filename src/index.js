import { div } from 'prelude-ls';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './GameLogic.js';

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
      <button className={"square"} onClick={() => this.state.material !== this.setState({material: this.state.material !== 'stone' ? 'stone' : 'empty'})}>
        <div className={"material " + this.state.material}></div>
      </button>
    );
  }
}
  
class Board extends React.Component {
    renderSquare(material) {
      return <Square material={material}/>;
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

      return grid.map((row, rowId) => {
        return (
          <div className="board-row" key={rowId}>
              {row.map((block, index) => {
                return (
                  this.renderSquare(block.material, index)
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
        grid: intializeGrid(props.size),
        waterStart: props.waterStart,
        waterEnd: props.waterEnd,
      }
      
    }

    startWater() {
      placeWater(this.state.grid, this.state.waterStart.x, this.state.waterStart.y);
      while(!done(this.state.grid)) {
        updateWater();
      }
    }

    updateWater() {
      updateGrid(this.state.grid);
      this.setState({grid: this.state.grid});
    }

    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <button onClick={() => {this.startWater()}}>Start water</button>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  