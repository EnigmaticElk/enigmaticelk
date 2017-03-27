import React from 'react';
import {render} from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import Paper from 'material-ui/Paper';
import Query from './query.jsx';
import Gmap from './gmap.jsx';
import Directions from './directions.jsx';
import MenuBar from './MenuBar.jsx'
import Legend from './legend.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      heatmapData: [],
      origDest: null,
      map: null,
      streetLines: null,
      legendRendered: false
    };
    this.setOrigAndDest = this.setOrigAndDest.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.setMap = this.setMap.bind(this);
    this.getCrimeData = this.getCrimeData.bind(this);
    this.displayLegend = this.displayLegend.bind(this);
  }

  componentDidMount() {
    axios.get('/heatmapData')
      .then(({data}) => {
        this.setState({
          heatmapData: data.heatmapData,
          ratingInfo: data.ratingInfo,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  componentDidUpdate() {
    this.displayLegend();
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

  displayLegend() {
    if (!this.state.legendRendered && this.state.map) {
      this.state.map.controls[google.maps.ControlPosition.RIGHT_TOP].push(document.getElementById('legend'));
      this.setState({
        legendRendered: true
      });
    }
  }

  getCrimeData(steps) {
    let coords = steps.map((step) => {
      let stepInfo = {
        lngLat: [[step.start_location.lng(), step.start_location.lat()], [step.end_location.lng(), step.end_location.lat()]],
        distance: step.distance.value,
      };
      return stepInfo;
    });
    axios.post('/ratings', {streets: coords})
      .then((res) => {
        this.setState({
          streetLines: res.data.crimesPerStreet,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render () {

    const mapStyle = {
      height: '500px',
      width: '99%',
      marginLeft: 5,
      marginTop: 5,
      marginRight: 10,
      textAlign: 'center',
      display: 'inline-block',
    };

    const directionsStyle = {
      width: '60%',
      marginLeft: 5,
      marginTop: 5,
      marginRight: 10,
      display: 'inline-block',
    };

    return (
      <MuiThemeProvider>
        <div>
          <MenuBar />
          <Query setOrigAndDest={this.setOrigAndDest}/>
          <br />
          <Paper
            style={mapStyle}
            zDepth={3}
            children={<Gmap
                heatmapData={this.state.heatmapData}
                setMap={this.setMap}
              />
            }
          />
          <br />
          <br />
          <Paper
            zDepth={this.state.origDest ? 1 : 0}
            style={directionsStyle}
          >
            <Directions
              origDest={this.state.origDest}
              map={this.state.map}
              getCrimeData={this.getCrimeData}
              streetLines={this.state.streetLines}
            />
          </Paper>
           <Legend ratingInfo={this.state.ratingInfo} />
        </div>
      </MuiThemeProvider>
    );
  }
}

render(<App/>, document.getElementById('app'));