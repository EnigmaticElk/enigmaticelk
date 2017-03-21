import React from 'react';
import {render} from 'react-dom';
import Query from './query.jsx';
import Gmap from './gmap.jsx';
import Directions from './directions.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      heatmapData: [],
      origDest: null,
      directions: null
    };
    this.setOrigAndDest = this.setOrigAndDest.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.setDirections = this.setDirections.bind(this);
  }

  componentDidMount() {
    axios.get('/heatmapData')
      .then(({data}) => {
        this.setState({
          heatmapData: data
        })
      })
      .catch((err) => {
        console.error(err);
      })
  }

  setOrigAndDest (origin, destination) {
    this.setState({
      origDest: [origin, destination]
    });
  }

  setDirections(directions) {
   this.setState({
     directions: directions
   });
  }

  render () {
    return (
      <div>
        <h1>SF SafeWalk</h1>
        <Query setOrigAndDest={this.setOrigAndDest}/>
        <br />
        <Gmap
          heatmapData={this.state.heatmapData}
          directions={this.state.directions}
        />
        <br />
        <Directions
          origDest={this.state.origDest}
          setDirections={this.setDirections}
         />
      </div>
    )
  }
}

render(<App/>, document.getElementById('app'));
