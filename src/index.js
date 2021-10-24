import { div } from 'prelude-ls';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import GameGrid from './GameLogic.js';
import { View, Image, Text,} from 'react-native';
//import { styles } from './styles.js';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import background from './assets/background.png';

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
    let block = this.props.grid.getIndex(this.props.x, this.props.y);
    let material = block.blockType === 'water' ? "water w" + (block.waterLevel[0] + 1) + "-" + (block.waterLevel[1]+1) : blockDict[block.blockType].material;
    let dropShadow = block.blockType === 'stone' ? "drop-shadow" : "";
    return (
      <button className={"square " + dropShadow} onClick={() => {
          this.props.grid.placeBlock(this.props.x, this.props.y, 'stone'); 
          this.setState({material: this.state.material !== 'stone' ? 'stone' : 'air'})
        }
        }>
        <div className="block-container">
          <div className={"material " + material}></div>
          <div className={"background-block"}></div>
        </div>
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
    console.log(this.props.grid.bucketGrid);
    //console.log(this.props.grid.bucketGrid[this.props.x][1])
    //console.log('test', blockDict[this.props.grid.bucketGrid[this.props.x][this.props.y]].material);
    return (
      <button className={"bucketpiece"}>
        <div className={"bucketpiece drop-shadow " + blockDict[this.props.grid.bucketGrid[this.props.x][this.props.y]].material}></div>
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
          {renderedBucketsTop}
          {renderedGrid}
          {renderedBucketsBottom}
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
      this.waterInterval = setInterval(() => {this.updateWater(this)}, 200);
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
      //i added some buttons here, but pretty sure they're not supposed to be here - max
      //also, no idea why i cant make a stylesheet (kept getting errors and gave up)
      return (
        <div className="game">
          <div className="game-board">
            <Board grid={this.state.grid} waterStart={this.props.waterStart} waterEnd={this.props.waterEnd}/>
          </div>
          <div className="button-list">
          <View style={{margin: 50}}>
        <button onClick={() => {this.startWater()}} className="button" style={{height: 100, width: 300, margin: 30, fontSize: 40,}}>Start water</button>
        <button onClick={() => {}} style={{height: 100, width: 300, margin: 30, fontSize: 40,}}>Reset</button>
        <button onClick={() => {}} style={{height: 100, width: 300, margin: 30, fontSize: 40,}}>Skip</button>
      </View>
          </div>
        </div>
      );
    }
  }

  class Play extends React.Component {

    constructor(props) {
      super(props);
    }
    // generate
    // generate rand buck grid
    // test if solution - repeat until generated with solution
    // - findSolution method
    // - if successful, returns [true, (how many buckets), (how many blocks used)]
    // ^^ these prob one method, call for Skip button as well
    
    //player inputs (plays game)
    // start water
    // if(done) if(win)
    // some step here
    // generate new

  }
  
  // ========================================

  ReactDOM.render( 
    <div className="body">
    <View>
      
      <View style={{flexDirection: 'row', height: 60}}>
        <Popup trigger={<button style={{fontSize: 30, width: '33%'}}>Instructions</button>} position="bottom middle">
        <div>
          Your goal is to use the blocks you have been given to direct
          the water stream from the starting point at the top to the
          ending point at the bottom!
        </div>
        </Popup>
        <Popup trigger={<button style={{fontSize: 30, width: '33%'}}>How It Works</button>} position="bottom middle">
        <div>
          This project was designed and built completely in Javascript,
          specifically the React.js library. The methods generate random
          grids, which are tested against an algorithm for solvability.
          These grids are the puzzles seen on your screen!
        </div>
        </Popup>
        <Popup trigger={<button style={{fontSize: 30, width: '33%'}}>About Us</button>} position="bottom middle">
        <div>
          This project was designed by team Discere during HackGT8, for
          the purpose of developing strong problem solving skills and
          fundamentals within children. The simplistic designs and
          themes are catered towards younger audiences, but everyone
          is invited to give these puzzles a go!
        </div>
        </Popup>
      </View>

      <View style={{left: 200}}>
        <Game size={8} waterStart={[0]} waterEnd={[5]}/>
      </View>
    </View>
    </div>,
    document.getElementById('root')

  );
