import { div } from 'prelude-ls';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import GameGrid from './GameLogic.js';

const blockDict = {
  stone: {
    'material' : 'stone',
  },
  air: {
    'material' : 'air',
  },
  water: {
    'material' : 'water',
  },
  fixw: {
    'material' : 'fixw',
  },
  leftcornerwater: {
    'material' : 'left-corner-water'
  },
  rightcornerwater: {
    'material' : 'right-corner-water'
  },
  obsidian: {
    'material' : 'obsidian'
  },
  bucket: {
    'material' : 'bucket'
  }

};

class Square extends React.Component {

  constructor(props) {
    super(props);
    //console.log(props);
    // console.log('piece three', props.grid.getIndex(props.x, props.y), [props.x], [props.y]);
    // console.log('important piece');
    this.state = {
      material: blockDict[props.grid.getIndex(props.x, props.y).blockType].material,
    };
    // console.log(this.props);
  }

  render() {
    return (
      <button className={"square"} onClick={() => {
        this.props.grid.placeBlock(this.props.x, this.props.y, 'stone'); 
        this.setState({material: this.state.material !== 'stone' ? 'stone' : 'air'})}
        }>
        <div className={"material " + blockDict[this.props.grid.getIndex(this.props.x, this.props.y).blockType].material}></div>
      </button>
    );
  }
}

class BucketPiece extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      material: blockDict[props.grid.getIndex(props.x, props.y).blockType].material,
    };
  }
  
  render() {
    // console.log(this.props.grid.bucketGrid[this.props.x][this.props.y])
    // console.log('props x', this.props.x)
    // console.log('props y', this.props.y)
    console.log(this.props);
    //console.log(this.props.grid.bucketGrid[this.props.x][1])
    //console.log('test', blockDict[this.props.grid.bucketGrid[this.props.x][this.props.y]].material);
    return (
      <button className={"square"}>
        <div className={"material " + blockDict[this.props.grid.bucketGrid[this.props.x][this.props.y]].material}></div>
      </button>
    );
  }
}

class Board extends React.Component {
    renderSquare(material, x, y) {
      //console.log('piece one', x, y, this.props.grid.getIndex(x,y));
      return <Square x={x} y={y} grid={this.props.grid}/>;
    }

    renderBucketPiece(material, x, y) {
      return <BucketPiece x={x} y={y} material={material} grid={this.props.grid}/>;
    }

    renderBucketGridTop(topbuckets, width) {
      const grid = [];
      for (let x = 0; x < width; x++) {
        grid.push(blockDict['obsidian']);
      }
      for(let i = 0; i < topbuckets.length; i++) {
        grid[topbuckets[i]] = blockDict['bucket'];
      }
      let columnIndex = -1;
      return grid.map((block) => {
        columnIndex++;
        return(this.renderBucketPiece(block.material, 0, columnIndex));
      }
      );
    }
    renderBucketGridBottom(bottombuckets, width) {
      const grid = [];
      for (let x = 0; x < width; x++) {
        grid.push(blockDict['obsidian']);
      }
      for(let i = 0; i < bottombuckets.length; i++) {
        grid[bottombuckets[i]] = blockDict['bucket'];
      }
      let columnIndex = -1;
      return grid.map((block) => {
        columnIndex++;
        return(this.renderBucketPiece(block.material, 1, columnIndex));
      }
      );
    }

    renderInitGrid(width, height) {
      const grid = [];
      for (let row = 0; row < width; row++) {
        const currentRow = [];
        for (let col = 0; col < height; col++) {
          currentRow.push(blockDict['air']);
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
                //console.log('piece two', block.material, rowIndex, columnIndex, this.props.grid.grid[rowIndex][columnIndex]);
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
      const renderedBucketsTop = this.renderBucketGridTop(this.props.waterStart, this.props.grid.getSize())
      const renderedBucketsBottom = this.renderBucketGridBottom(this.props.waterEnd, this.props.grid.getSize())
      // console.log(this.props.waterStart)
      // console.log(this.props.grid.getSize())
      // console.log(renderedBucketsTop);
      const renderedGrid = this.renderInitGrid(this.props.grid.getSize(), this.props.grid.getSize());
      // console.log("Rendered");
      // console.log(renderedGrid);
      // console.log(renderedBucketsTop);
      return (
        <div>
          <div className="status">{status}</div>
          <div>{renderedBucketsTop}</div>
          {renderedGrid}
          <div>{renderedBucketsBottom}</div>
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
      }
      this.bucketGrid = this.state.grid.initBucketGrid(props.size, props.waterStart, props.waterEnd);
    }

    startWater() {
      // console.log(this.state);
      this.state.grid.initBucketGrid(this.props.size, this.props.waterStart, this.props.waterEnd);
      this.state.grid.placeWater(this.props.waterStart[0], 0);
      this.state.grid.updateAllBlock();
      this.waterInterval = setInterval(() => {this.updateWater(this)}, 700);
    }

    updateWater(game) {
      game.state.grid.updateGrid();
      // console.log(game.state.grid);
      game.setState({grid: game.state.grid});
      if (game.state.grid.done()) {
        clearInterval(game.waterInterval);
        //console.log(game.state.grid.checkForWin());//put in params
      }
    }

    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board grid={this.state.grid} waterStart={this.props.waterStart} waterEnd={this.props.waterEnd}/>
          </div>
          <button onClick={() => {this.startWater()}}>Start water</button>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render( 
    <Game size={8} waterStart={[0]} waterEnd={[5]}/>,
    document.getElementById('root')
  );
  