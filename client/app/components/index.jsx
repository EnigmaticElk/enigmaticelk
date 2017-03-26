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
      map: null,
      streetLines: null
    };
    this.setOrigAndDest = this.setOrigAndDest.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.setMap = this.setMap.bind(this);
    this.getCrimeData = this.getCrimeData.bind(this);
  }

  componentDidMount() {
    axios.get('/heatmapData')
      .then(({data}) => {
        this.setState({
          heatmapData: data
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  setOrigAndDest (origin, destination) {
    this.setState({
      origDest: [origin, destination]
    });
  }

  setMap(map) {
    if (!this.state.map) {
      this.setState({
        map: map
      });
    }
  }

  getCrimeData(steps) {
    let coords = steps.map((step) => {
      return [[step.start_location.lng(), step.start_location.lat()], [step.end_location.lng(), step.end_location.lat()]];
    });
    axios.post('/ratings', {streets: coords})
      .then((res) => {
        console.log('res.data.crimesPerStreet: ', res.data.crimesPerStreet);
        this.setState({
          streetLines: res.data.crimesPerStreet
        });
      })
      .catch((err) => {
        console.error(err);
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
          setMap={this.setMap}
        />
        <br />
        <Directions
          origDest={this.state.origDest}
          map={this.state.map}
          getCrimeData={this.getCrimeData}
          streetLines={this.state.streetLines}
         />
      </div>
    );
  }
}

render(<App/>, document.getElementById('app'));
