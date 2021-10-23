import { div } from 'prelude-ls';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

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

    renderGrid(grid) {

      return grid.map((row, rowId) => {
        return (
          <div className="board-row" key={rowId}>
              {row.map((blockid, index) => {
                return (
                  this.renderSquare(blockDict[blockid].material)
                );
              })}
          </div>
        )
      });

    }

    render() {
      const status = 'Poggers';
      const renderedGrid = this.renderGrid(8, 8);
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
  