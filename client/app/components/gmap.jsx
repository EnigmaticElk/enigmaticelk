import React from 'react';
import ReactDOM from 'react-dom';

class Gmap extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
    this.overlayHeatmap = this.overlayHeatmap.bind(this);
  }

  mapCenterLatLng() {
    return new google.maps.LatLng(this.props.mapCenterLat, this.props.mapCenterLng);
  }

  componentDidMount() {
    var dom = ReactDOM.findDOMNode(this);
    var mapOptions = {
      center: this.mapCenterLatLng(),
      zoom: this.props.initialZoom
    },
    map = new google.maps.Map(dom, mapOptions);
    this.setState({map: map});
  }

  componentDidUpdate() {
    var map = this.state.map;

    if (this.props.markers[0]) {
      var bounds = new google.maps.LatLngBounds();
      var infoWindow = new google.maps.InfoWindow();

      this.props.markers.forEach((marker) => {
        marker.setMap(map);
        bounds.extend(marker.position);
      });
      map.fitBounds(bounds);
    }

    if (this.props.heatmapData.length > 0) {
      this.overlayHeatmap();
    }
  }

  overlayHeatmap() {

    var heatmapPoints = this.props.heatmapData.map(function(crime) {
      return new google.maps.LatLng(crime.location.coordinates[1] - 0, crime.location.coordinates[0] - 0);
    });

    // Google heatmap layer has upper limites so we can't render all at once for right now
    var heatmapSlice = heatmapPoints.slice(0, 58000);

    var heatmap = new google.maps.visualization.HeatmapLayer({
      data: heatmapSlice,
      radius: 30,
      map: this.state.map
    });

  }

  render() {
    var style = {
      width: '650px',
      height: '650px'
    };

    return (
      <div className='map' style={style}></div>
    );
  }
};

export default Gmap;