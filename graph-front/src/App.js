import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import '../node_modules/react-vis/dist/style.css';
import {
  XYPlot,
  MarkSeries,
  VerticalGridLines,
  HorizontalGridLines,
  XAxis,
  YAxis
} from 'react-vis';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      index: null
    };
  }

  componentWillMount() {
    axios
      .get(`localhost:5000/graph/api/v1.0/test/`)
      .then(res => {
        console.log(res);
        const posts = res
          .data
          .data
          .children
          .map(obj => obj.data);
        this.setState({posts});
      });
  }

  render() {
    axios
      .get("/graph/api/v1.0/test/")
      .then(res => {
        console.log(res);
        const posts = res
          .data
          .data
          .children
          .map(obj => obj.data);
        this.setState({posts});
      });
    const data = [
      {
        x: 0,
        y: 8
      }, {
        x: 1,
        y: 5
      }, {
        x: 2,
        y: 4
      }, {
        x: 3,
        y: 9
      }, {
        x: 4,
        y: 1
      }, {
        x: 5,
        y: 7
      }, {
        x: 6,
        y: 6
      }, {
        x: 7,
        y: 3
      }, {
        x: 8,
        y: 2
      }, {
        x: 9,
        y: 0
      }
    ];
    const {index} = this.state;
    return (
      <div className="App">
        <XYPlot
          height={700}
          width={1000}
          colorDomain={[0, 1]}
          onMouseLeave={() => this.setState({index: null})}>
          <VerticalGridLines/>
          <HorizontalGridLines/>
          <XAxis/>
          <YAxis/>
          <MarkSeries
            data={data}
            stroke="white"
            onNearestXY={(datapoint, {index}) => this.setState({index})}/>
        </XYPlot>
      </div>
    );
  }
}

export default App;