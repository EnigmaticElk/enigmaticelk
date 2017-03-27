import React from 'react';
import Legend from './legend.jsx';

class Directions extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      origDest: null,
      drawnLines: [],
      undrawnLines: [],
      routeIndex: 0
    };
    this.displayLegend = this.displayLegend.bind(this);
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
    this.setState({
      directionsService: directionsService,
      directionsDisplay: directionsDisplay
    });
    directionsDisplay.addListener('directions_changed', () => {
      this.renderLines(0);
    });
    directionsDisplay.addListener('routeindex_changed', () => {
      let routeIndex = directionsDisplay.getRouteIndex();
      if (this.state.routeIndex !== routeIndex) {
        this.setState({
          routeIndex: routeIndex
        });
        this.renderLines(routeIndex);
      }
    });
  }

  renderLines(routeIndex) {
    this.clearLines();
    let directions = this.state.directionsDisplay.directions;
    this.props.getCrimeData(directions.routes[routeIndex].legs[0].steps);    
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
    }
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

    this.state.drawnLines.push(dirRenderer);
    dirRenderer.setMap(this.props.map);

    let request = {
      origin: origin,
      destination: destination,
      travelMode: 'WALKING'
    };

    this.state.directionsService.route(request, (response, status) => {
      if (status === 'OK') {
        dirRenderer.setDirections(response);
      } else if (status === 'OVER_QUERY_LIMIT') {
        this.state.undrawnLines.push(setTimeout(() => {
          this.drawLine(origin, destination, rating)
        }, 1000));
      }
    });
  }

  clearLines() {
    this.state.drawnLines.forEach((line) => {
      line.setMap(null);
    });
    this.state.undrawnLines.forEach((line) => {
      clearTimeout(line);
    })
  }

  displayLegend() {
    if (this.state.origDest) {
      return <Legend ratingInfo={this.props.ratingInfo} />;
    }
  }

  render() {
    var style = {
      width: '750px',
      height: '650px'
    };

    return (
      <div id='directionsPanel' style={style}>
        {this.displayLegend()}
      </div>
    );
  }
}

export default Directions;