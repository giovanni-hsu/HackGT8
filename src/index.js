import { div } from 'prelude-ls';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

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

  render() {
    console.log(this.props.material);
    return (
      <button className={"square " + this.props.material} >
        {/* TODO */}
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
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  