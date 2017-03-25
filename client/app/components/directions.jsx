import React from 'react';

class Directions extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      origDest: null,
      lines: []
    };
  }

  componentDidMount() {
    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer({
      draggable: true,
      polylineOptions: {
        strokeOpacity: 0.25
      }
    });
    directionsDisplay.setPanel(document.getElementById('directionsPanel'));
    directionsDisplay.addListener('routeindex_changed', () => {
      this.clearLines();
      let directions = directionsDisplay.directions;
      let routeIndex = directionsDisplay.getRouteIndex();
      this.props.getCrimeData(directions.routes[routeIndex].legs[0].steps);
    });
    this.setState({
      directionsService: directionsService,
      directionsDisplay: directionsDisplay
    });
  }

  componentDidUpdate() {
    if (this.props.map) {
      this.state.directionsDisplay.setMap(this.props.map);
    }
    if (this.props.origDest && this.props.origDest !== this.state.origDest) {
      this.calcRoute(this.props.origDest[0].formatted_address, this.props.origDest[1].formatted_address);
      this.setState({
        origDest: this.props.origDest
      });
    };
    if (this.props.streetLines) {
      this.props.streetLines.forEach((line) => {
        let origin = `${line[0][1]},${line[0][0]}`;
        let dest = `${line[1][1]},${line[1][0]}`;
        this.drawLine(origin, dest, line[2].rating);
      });
    }
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
        this.state.directionsDisplay.setDirections(response);
      }
    });
  }

  drawLine(origin, destination, rating) {
    let options = {
      strokeColor: rating,
      strokeOpacity: 0.75,
      strokeWeight: 5
    };

    let dirRenderer = new google.maps.DirectionsRenderer({
      suppressMarkers: true,
      polylineOptions: options,
      preserveViewport: true
    });

    this.state.lines.push(dirRenderer);
    dirRenderer.setMap(this.props.map);

    let request = {
      origin: origin,
      destination: destination,
      travelMode: 'WALKING'
    };

    this.state.directionsService.route(request, (response, status) => {
      if (status === 'OK') {
        dirRenderer.setDirections(response);
      }
    });
  }

  clearLines() {
    this.state.lines.forEach((line) => {
      line.setMap(null);
    });
  }

  render() {
    var style = {
      width: '750px',
      height: '650px'
    };

    return (
      <div id='directionsPanel' style={style}></div>
    );
  }
}

export default Directions;