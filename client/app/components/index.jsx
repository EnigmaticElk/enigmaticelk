import React from 'react';
import {render} from 'react-dom';
import Query from './query.jsx';
import Gmap from './gmap.jsx';
import $ from 'jquery';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      markers: [],
      initialZoom: 12,
      mapCenterLat: 37.773972,
      mapCenterLng: -122.431297,
      heatmapData: [],
    };
    this.setOrigAndDest = this.setOrigAndDest.bind(this);
    this.getHeatmapData = this.getHeatmapData.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    this.getHeatmapData((results) => {
      this.setState({heatmapData: results});
    });
  }

  setOrigAndDest (origin, destination) {
    var origMarker = new google.maps.Marker({
      position: new google.maps.LatLng(origin.geometry.location.lat(), origin.geometry.location.lng()),
      title: 'Origin',
      label: 'O',
      animation: google.maps.Animation.DROP
    });
    var destMarker = new google.maps.Marker({
      position: new google.maps.LatLng(destination.geometry.location.lat(), destination.geometry.location.lng()),
      title: 'Destination',
      label: 'D',
      animation: google.maps.Animation.DROP
    });

    this.state.markers.forEach((marker) => {
      marker.setMap(null);
    });

    this.setState({
      markers: [origMarker, destMarker]
    });
  }

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

  getHeatmapData (callback) {
    $.ajax({
      url: '/heatmapData',
      method: 'GET',
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
          markers={this.state.markers}
          heatmapData={this.state.heatmapData}
        />
      </div>
    )
  }
}

render(<App/>, document.getElementById('app'));
