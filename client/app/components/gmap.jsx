import React from 'react';
import ReactDOM from 'react-dom';

class Gmap extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      heatmapRendered: false
    };
    this.overlayHeatmap = this.overlayHeatmap.bind(this);
  }

  componentDidMount() {
    var dom = ReactDOM.findDOMNode(this);
    var mapOptions = {
      center: new google.maps.LatLng(37.773972, -122.431297),
      zoom: 12
    };
    var map = new google.maps.Map(dom, mapOptions);
    this.setState({map: map});
  }


  componentDidUpdate() {
    var map = this.state.map;
    this.props.setMap(map);
    // if (this.state.origDest) {
    //   createMarkers(this.state.origDest[0],this.state.origDest[1])
    // }
    if (!this.state.heatmapRendered && this.props.heatmapData.length > 0) {
      this.overlayHeatmap();
      this.setState({
        heatmapRendered: true
      })
    }
  }

  overlayHeatmap() {
    var heatmapPoints = this.props.heatmapData.map(function(crime) {
      return new google.maps.LatLng(crime.location.coordinates[0] - 0, crime.location.coordinates[1] - 0);
    });
    // Google heatmap layer has upper limites so we can't render all at once for right now
    var heatmapSlice = heatmapPoints.slice(0, 58000);
    var heatmap = new google.maps.visualization.HeatmapLayer({
      data: heatmapSlice,
      radius: 20,
      map: this.state.map
    });
  }

  render() {
    var style = {
      width: '750px',
      height: '500px'
    };

    return (
      <div className='map' style={style}></div>
    );
  }
};

export default Gmap;

  // createMarkers(origin, destination) {
  //   var map = this.state.map;

  //   var origMarker = new google.maps.Marker({
  //     position: new google.maps.LatLng(origin.geometry.location.lat(), origin.geometry.location.lng()),
  //     title: 'Origin',
  //     label: 'O',
  //     animation: google.maps.Animation.DROP
  //   });
  //   var destMarker = new google.maps.Marker({
  //     position: new google.maps.LatLng(destination.geometry.location.lat(), destination.geometry.location.lng()),
  //     title: 'Destination',
  //     label: 'D',
  //     animation: google.maps.Animation.DROP
  //   });

  //   this.state.markers.forEach((marker) => {
  //     marker.setMap(null);
  //   });

  //   this.setState({
  //     markers: [origMarker, destMarker]
  //   });

  //   var bounds = new google.maps.LatLngBounds();
  //   var infoWindow = new google.maps.InfoWindow();

  //   this.state.markers.forEach((marker) => {
  //     marker.setMap(map);
  //     bounds.extend(marker.position);
  //   });
  //   map.fitBounds(bounds);
  // }