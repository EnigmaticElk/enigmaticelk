import React from 'react';
import ReactDOM from 'react-dom';

class Gmap extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  mapCenterLatLng() {
    var props = this.props;
    return new google.maps.LatLng(props.mapCenterLat, props.mapCenterLng);
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
    map.panTo(this.mapCenterLatLng());
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

Gmap.defaultProps = {
  initialZoom: 12,
  mapCenterLat: 37.773972,
  mapCenterLng: -122.431297,
};

export default Gmap;