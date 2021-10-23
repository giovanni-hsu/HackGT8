import { div } from 'prelude-ls';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function space() {
  return {
    color: 'white'
  }
}


class Square extends React.Component {
    render() {
      return (
        <button className="square">
          {/* TODO */}
        </button>
      );
    }
  }
  
class Board extends React.Component {
    renderSquare(color, i) {
      return <Square />;
    }

    renderGrid(width, height) {
      const grid = [];
      for (let row = 0; row < width; row++) {
        const currentRow = [];
        for (let col = 0; col < height; col++) {
          currentRow.push({
            color: 'white'
          });
        }
          grid.push(currentRow);
      }

      grid.map((row, rowId) => {
        return (
          <div class="board-row" key={rowId}>
              {row.map((color, index) => {
                return (
                  this.renderSquare(color, index)
                );
              })}
          </div>
        )
      });

    }

    render() {
      const status = 'Poggers';

      return (
        <div>
          <div className="status">{status}</div>
          
          {renderGrid(8, 8)}
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
  