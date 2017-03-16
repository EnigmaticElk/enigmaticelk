import React from 'react';
import ReactDOM from 'react-dom';

class Gmap extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
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
  }

  render() {
    var style = {
      width: '500px',
      height: '500px'
    };

    return (
      <div className='map' style={style}></div>
    );
  }
};

export default Gmap;