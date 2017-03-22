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