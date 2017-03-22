import React from 'react';

class Directions extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      origDest: null
    };
  }

  componentDidMount() {
    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer({
      draggable: true
    });
    directionsDisplay.setPanel(document.getElementById('directionsPanel'));
    this.setState({
      directionsService: directionsService,
      directionsDisplay: directionsDisplay
    });
  }

  componentDidUpdate() {
    if (this.props.map) {
      this.state.directionsDisplay.setMap(this.props.map);
      this.drawLine();
    }
    if (this.props.origDest && this.props.origDest !== this.state.origDest) {
      this.calcRoute(this.props.origDest[0].formatted_address, this.props.origDest[1].formatted_address);
      this.setState({
        origDest: this.props.origDest
      })
    };
  }

  calcRoute(start, end) {
    var request = {
      origin: start,
      destination: end,
      travelMode: 'WALKING',
      provideRouteAlternatives: true
    };
    this.state.directionsService.route(request, (response, status) => {
      if (status === 'OK') {
        this.props.getCrimeData(response.routes[0].legs[0].steps);
        this.state.directionsDisplay.setDirections(response);
      }
    })
  }

  drawLine() {
    let options = {
      strokeColor: 'red',
      strokeOpacity: 0.25,
      strokeWeight: 3
    }

    let dirRenderer = new google.maps.DirectionsRenderer({
      supressMarkers: true,
      polylineOptions: options,
      markerOptions: {
        visible: false,
      },
      preserveViewport: true
    })

    dirRenderer.setMap(this.props.map);

    let request = {
      origin: '37.8035631,-122.41491610000003',
      destination: '37.78694650000001,-122.41154790000002',
      travelMode: 'WALKING'
    };

    this.state.directionsService.route(request, (response, status) => {
      if (status === 'OK') {
        dirRenderer.setDirections(response);
      }
    })
  }

  render() {
    var style = {
      width: '750px',
      height: '650px'
    }

    return (
      <div id='directionsPanel' style={style}></div>
      )
  };
};

export default Directions;