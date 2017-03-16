import React from 'react';
import {render} from 'react-dom';
import Query from './query.jsx';
import Gmap from './gmap.jsx';
import $ from 'jquery';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      origin: {lat: 0, lng: 0},
      destination: {lat: 0, lng: 0},
      initialZoom: 12,
      mapCenterLat: 37.773972,
      mapCenterLng: -122.431297,
    };
    this.setOrigAndDest = this.setOrigAndDest.bind(this);
    this.changeLoc = this.changeLoc.bind(this);    
  }

  setOrigAndDest (origin, destination) {
    this.getCoords(origin, (oriResults) => {
      this.getCoords(destination, (destResults) => {
        this.setState({
          origin: {lat: oriResults.Lat,
                   lng: oriResults.Lng},
          destination: {lat: destResults.Lat,
                        lng: destResults.Lng}
        });
      });
    });
  }

  changeLoc(lat, lng) {
    this.setState({
      mapCenterLat: lat,
      mapCenterLng: lng
  })

  getCoords (address, callback) {
    $.ajax({
      url: '/search',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        address: address
      }),
      success: function (data) {
        callback(data);
      },
      error: function(err) {
        console.log(err);
      }
    });
  }

  render () {
    return (
      <div>
        <h1>SF SafeWalk</h1>
        <Query setOrigAndDest={this.setOrigAndDest}/>
        <br />
        <Gmap
          initialZoom={this.state.initialZoom}
          mapCenterLat={this.state.mapCenterLat}
          mapCenterLng={this.state.mapCenterLng}
        />
      </div>
    )
  }
}

render(<App/>, document.getElementById('app'));